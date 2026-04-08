import fs from 'fs';

try {
  const fileContent = fs.readFileSync('eslint-report.json', 'utf16le').replace(/^\uFEFF/, '');
  const data = JSON.parse(fileContent);
  const issues = {};

  data.forEach(file => {
    if (file.errorCount > 0 || file.warningCount > 0) {
      issues[file.filePath] = file.messages.map(m => ({
        ruleId: m.ruleId,
        message: m.message,
        line: m.line
      }));
    }
  });

  const output = [];
  for (const [filePath, messages] of Object.entries(issues)) {
    const relPath = filePath.split('katalogku')[1] || filePath;
    output.push(`\nFile: ${relPath}`);
    messages.forEach(m => {
      output.push(`  L${m.line}: ${m.ruleId} - ${m.message}`);
    });
  }

  // Save to summary file
  fs.writeFileSync('eslint-summary.txt', output.join('\n'));
  console.log(`Parsed. Found issues in ${Object.keys(issues).length} files.`);
} catch (e) {
  console.error("Error parsing:", e.message);
}
