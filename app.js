var Srf = require('drachtio-srf');
var app = new Srf();

app.invite(async (req, res) => {
  try {
    const { uas, uac } = await app.createB2BUA(req, res, "sip:service@172.29.0.11:6060");

    console.log(`\n=============== Call "${req.get("Subject")}" Start ===============\n`);

    uas.on("ack", () => {
      console.log(`UAS ACK received for call "${req.get("Subject")}"`);
    });

    console.log("UAC Remote SDP:");
    console.log(uac.remote.sdp + "\n");
    console.log("UAS Remote SDP:");
    console.log(uas.remote.sdp);
    console.log(`=============== Call "${req.get("Subject")}" End ===============\n`);

    uac.on("destroy", () => uas.destroy());
    uas.on("destroy", () => uac.destroy());
  } catch (e) {
    console.error("Failed to set up call: ", e);
  }
});

app.connect({
  // host: "127.0.0.1",
  host: "172.29.0.10",
  port: 9022,
  secret: "cymru",
});

app.on("connect", (_, hostport) => {
  console.log(`connected to drachtio listening for SIP on hostport ${hostport}`);
});

app.on("error", (err) => {
  console.log(`Error connecting to drachtio server: ${err.message}`);
});