const dns = require("dns");
const { execFile } = require("child_process");
const os = require("os");

// Target domain
const DOMAIN = "dummyjson.com";

// ========== DNS LOOKUP ==========
dns.lookup(DOMAIN, (err, address, family) => {
  if (err) {
    console.error("❌ DNS Lookup Error:", err.message);
    return;
  }
  console.log(`🌐 IP Address: ${address} (IPv${family})`);
});

// ========== TRACEROUTE ==========
function runTraceroute(domain) {
  let command;
  let args;

  const platform = os.platform();

  if (platform === "win32") {
    // Windows uses tracert
    command = "C:\\Windows\\System32\\tracert.exe";
    args = [domain];
  } else if (platform === "darwin") {
    // macOS
    command = "/usr/sbin/traceroute";
    args = [domain];
  } else {
    // Linux (default)
    command = "/usr/bin/traceroute";
    args = [domain];
  }

  execFile(command, args, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Traceroute Error:", err.message);
      return;
    }

    if (stderr) {
      console.error("⚠️ Traceroute Warning:", stderr);
    }

    console.log("\n🛰️ Traceroute Result:\n");
    console.log(stdout);
  });
}

// Run traceroute
runTraceroute(DOMAIN);
