export async function fetchSiteSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/setting`, {
      cache: 'no-store', // Tránh cache trên server để lấy dữ liệu mới nhất
    });

    if (!res.ok) {
      throw new Error('Failed to fetch site settings');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return {}; // Trả về object rỗng để tránh lỗi
  }
}
