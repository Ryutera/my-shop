// lib/contentful.ts

import { createClient as createDeliveryClient } from 'contentful';
import { createClient as createManagementClient } from 'contentful-management';

// 表示用（CDN最適化された読み取り専用クライアント）
export const contentfulClient = createDeliveryClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!, // delivery token
});

// 管理用（更新・削除などが可能）
export const contentfulManagementClient = createManagementClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!, // management token
});
