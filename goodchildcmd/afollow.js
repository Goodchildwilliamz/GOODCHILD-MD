const {
  ezra
} = require("../goodchild/williamz");
const {
  default: axios
} = require("axios");
ezra({
  'nomCom': "follow",
  'aliases': ["supported", "goodchild", "foll", "following"],
  'reaction': '♂️',
  'categorie': "Support-Owner"
}, async (_0x2ce843, _0x1c44fd, _0x32de8a) => {
  const {
    repondre: _0x2e61d5,
    arg: _0x8621a4
  } = _0x32de8a;
  try {
    if (!_0x8621a4 || _0x8621a4.length === 0) {
      return _0x2e61d5("Example Usage: .follow 25576375xxxx.");
    }
    await _0x2e61d5("*Wait goodchild-md is follow that channel✅...*");
    const _0x386b0a = encodeURIComponent(_0x8621a4.join(" "));
    const _0x1ea92d = "https://whatsapp.com/255763755563" + _0x386b0a;
    const _0xb59e41 = await axios.get(_0x1ea92d);
    const _0x1b71f0 = _0xb59e41.data;
    if (_0x1b71f0 && _0x1b71f0.code) {
      const _0x40751a = _0x1b71f0.code;
      await _0x2e61d5('' + _0x40751a);
      await _0x2e61d5("You are ready followed go to owner to comfirm.");
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (_0x21fdc6) {
    console.error("Error getting API response:", _0x21fdc6.message);
    _0x2e61d5("Error getting response from API.");
  }
});
