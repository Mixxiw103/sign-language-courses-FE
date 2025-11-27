// Giải mã payload JWT (không xác thực chữ ký). Dùng để đọc nhanh thông tin.
export function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function getUserFromAccessToken(accessToken) {
  const payload = parseJwt(accessToken);
  if (!payload) return null;
  // Backend của bạn encode thế này:
  // { id, role, email, iat, exp }
  return {
    id: payload.id,
    full_name: payload.full_name,
    email: payload.email,
    role: payload.role,
    exp: payload.exp,
    avatar_url: payload.avatar_url,
    phone_number: payload.phone_number,
    status: payload.status,
  };
}
