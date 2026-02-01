export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export interface SpaceDto {
  spaceId: string;
  locationCode: string;
  occThreshold: number;
  updatedAt: string;
}

export async function checkServer(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/spaces`, {
      method: 'GET',
    });

    // ❗ HTTP 응답이 오면 서버는 살아있음
    return true;
  } catch {
    // ❗ 네트워크 자체 실패만 오프라인
    return false;
  }
}



