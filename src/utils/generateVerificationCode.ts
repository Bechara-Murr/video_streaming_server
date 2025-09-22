export function generateCode(type: "verification" | "password_reset"): string {
  let length: number;

  if (type === "verification") {
    length = parseInt(process.env.VERIFICATION_CODE_LENGTH || "4", 10);
  } else if (type === "password_reset") {
    length = parseInt(process.env.PASSWORD_RESET_CODE_LENGTH || "4", 10);
  } else {
    length = 4;
  }

  const digits = Number.isFinite(length) ? Math.min(Math.max(length, 4), 10) : 4;

  const n = Math.floor(Math.random() * 10 ** digits);
  return n.toString().padStart(digits, "0");
}
