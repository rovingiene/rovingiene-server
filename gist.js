import crypto from "crypto";

console.log("test");
const enc = new TextEncoder();
const encoded = enc.encode("hello");
console.log(encoded);
// crypto.subtle.encrypt({ name: "RSA-OAEP" }, "asldk;alsdks", encoded);
console.log(crypto);
