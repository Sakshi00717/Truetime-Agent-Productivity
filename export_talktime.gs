/**
 * TrueTime: Accurate Agent Productivity Reporting
 * apps_script/export_talktime.gs
 *
 * Writes today's WhatsApp talk time and break removals to a CSV in Drive,
 * for the Ozonetel productivity report to read.
 *
 * Only three columns leave this sheet -- agent, talk, break. Patient names,
 * mobile numbers and screenshot links stay here.
 *
 * SETUP
 *   1. In the sheet: Extensions -> Apps Script
 *   2. Delete whatever is there, paste this whole file, Save
 *   3. Check FORM_TAB below matches the tab name at the bottom of your sheet
 *   4. Run -> exportTalktime, and approve the permission prompt once
 *   5. Triggers (clock icon) -> Add Trigger -> exportTalktime,
 *      Time-driven, Hour timer, Every hour
 *
 * The file is overwritten in place, so the PC always sees the latest figures
 * and a row added at 17:55 is still counted.
 */

var FORM_TAB    = 'Form responses 1';   // <- the tab the form writes into
var FOLDER_NAME = 'Ozonetel Sync';      // created in My Drive if missing
var FILE_NAME   = 'talktime.csv';
var TZ          = 'Asia/Kolkata';


function exportTalktime() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(FORM_TAB);
  if (!sheet) {
    throw new Error('No tab called "' + FORM_TAB + '". Tabs are: ' +
                    SpreadsheetApp.getActive().getSheets()
                      .map(function (s) { return s.getName(); }).join(', '));
  }

  // Display values, not raw values -- durations come back as "00:25:00"
  // strings and the timestamp as "22/09/2026 06:14:45", which sidesteps
  // every timezone and date-serial problem.
  var rows = sheet.getDataRange().getDisplayValues();
  if (rows.length < 2) { write('agent,talk,break\n'); return 'no rows'; }

  var head = rows.shift().map(function (h) {
    return String(h || '').trim().toLowerCase();
  });

  var iWhen  = find(head, ['timestamp']);
  var iTalk  = find(head, ['talk time', 'talktime']);
  var iBreak = find(head, ['remove break']);
  var iAgent = find(head, ['referred by']);

  if (iWhen < 0 || iTalk < 0 || iBreak < 0 || iAgent < 0) {
    throw new Error('Could not find a column. Header is: ' + head.join(' | '));
  }

  var today = Utilities.formatDate(new Date(), TZ, 'dd/MM/yyyy');
  var totals = {};
  var counted = 0;

  for (var r = 0; r < rows.length; r++) {
    var row = rows[r];
    var when = String(row[iWhen] || '').trim();
    if (when.indexOf(today) !== 0) { continue; }

    var agent = String(row[iAgent] || '').trim();
    if (!agent) { continue; }

    var talk = seconds(row[iTalk]);
    var brk  = seconds(row[iBreak]);
    if (!talk && !brk) { continue; }

    if (!totals[agent]) { totals[agent] = { talk: 0, brk: 0 }; }
    totals[agent].talk += talk;
    totals[agent].brk  += brk;
    counted++;
  }

  var names = Object.keys(totals).sort();
  var csv = 'agent,talk,break\n';
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    csv += '"' + name.replace(/"/g, '""') + '",' +
           hms(totals[name].talk) + ',' + hms(totals[name].brk) + '\n';
  }

  write(csv);
  Logger.log('%s: %s row(s), %s agent(s)\n%s', today, counted, names.length, csv);
  return csv;
}


/** First column whose header contains any of these needles. */
function find(head, needles) {
  for (var i = 0; i < head.length; i++) {
    for (var n = 0; n < needles.length; n++) {
      if (head[i].indexOf(needles[n]) !== -1) { return i; }
    }
  }
  return -1;
}


/** "00:25:00" -> 1500.  "25" -> 1500 (a bare number means minutes). */
function seconds(text) {
  text = String(text == null ? '' : text).trim();
  if (!text) { return 0; }
  if (text.indexOf(':') !== -1) {
    var parts = text.split(':');
    var total = 0;
    var scale = [3600, 60, 1];
    for (var i = 0; i < 3; i++) {
      total += (parseInt(parts[i], 10) || 0) * scale[i];
    }
    return total;
  }
  var value = parseFloat(text);
  return isNaN(value) ? 0 : Math.round(value * 60);
}


function hms(total) {
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  return pad(Math.floor(total / 3600)) + ':' +
         pad(Math.floor((total % 3600) / 60)) + ':' +
         pad(total % 60);
}


/** Overwrite the CSV in place so Drive for Desktop syncs the same file. */
function write(csv) {
  var folders = DriveApp.getFoldersByName(FOLDER_NAME);
  var folder = folders.hasNext() ? folders.next()
                                 : DriveApp.createFolder(FOLDER_NAME);
  var files = folder.getFilesByName(FILE_NAME);
  if (files.hasNext()) { files.next().setContent(csv); }
  else { folder.createFile(FILE_NAME, csv, MimeType.CSV); }
}
