const { z } = require("zod");
try {
    console.log("z.email exists:", typeof z.email);
    if (typeof z.email === 'function') {
        const schema = z.email();
        console.log("z.email() returns:", schema.safeParse("test@example.com").success);
    }
} catch (e) {
    console.log("Error:", e.message);
}
