async function test() {
  try {
    const res = await fetch('http://localhost:4001/api/auth/providers');
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Body:", text.substring(0, 500));
  } catch (e) {
    console.error(e);
  }
}
test();
