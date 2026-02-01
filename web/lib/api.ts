export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export interface SpaceDto {
  spaceId: string;
  locationCode: string;
  occThreshold: number;
  updatedAt: string;
}

export async function fetchSpaces(): Promise<SpaceDto[]> {
  const res = await fetch(`${API_BASE_URL}/api/spaces`);
  if (!res.ok) {
    throw new Error('Failed to fetch spaces');
  }
  return res.json();
}


