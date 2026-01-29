const { z } = require("zod");
try {
    console.log("z.treeifyError exists:", typeof z.treeifyError);
} catch (e) {
    console.log("Error:", e.message);
}
