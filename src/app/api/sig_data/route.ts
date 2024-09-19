// src/app/api/sig_data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Prisma Client 인스턴스 생성
const prisma = new PrismaClient();

// GET 메서드를 위한 API 핸들러 함수 정의
export async function GET(req: NextRequest) {
  try {
    // sig_data 테이블에서 모든 데이터를 선택
    const sigData = await prisma.sig_data.findMany();

    // 데이터를 JSON 형식으로 반환
    return NextResponse.json(sigData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    // Prisma Client 연결 종료
    await prisma.$disconnect();
  }
}
