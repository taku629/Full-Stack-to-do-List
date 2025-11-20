# 🚀 Fullstack Task Manager - クイックスタートガイド

## 📦 必要なもの
- Node.js (v16以上)
- npm または yarn

## ⚡ セットアップ手順

### 1. プロジェクトをダウンロード
このフォルダ全体をローカルマシンにダウンロードしてください。

### 2. バックエンドのセットアップ

```bash
# backendディレクトリに移動
cd backend

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

バックエンドサーバーが `http://localhost:5000` で起動します。

### 3. フロントエンドのセットアップ（新しいターミナルウィンドウで）

```bash
# frontendディレクトリに移動
cd frontend

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

フロントエンドが `http://localhost:5173` で起動します。

### 4. アプリケーションを使う

1. ブラウザで `http://localhost:5173` にアクセス
2. 新しいアカウントを登録（Register）
3. ログインして使い始める！

## 🎯 機能

### ✅ 実装済み機能
- ユーザー認証（登録・ログイン）
- プロジェクト管理（作成・削除）
- タスク管理（作成・更新・削除）
- カンバンボード（To Do / In Progress / Done）
- 優先度設定（Low / Medium / High）
- レスポンシブデザイン
- リアルタイム通信対応（WebSocket）

### 📊 技術スタック

**フロントエンド:**
- React 18 + TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS

**バックエンド:**
- Node.js + Express
- TypeScript
- JWT認証
- WebSocket
- JSONファイルストレージ

## 📝 使い方

1. **プロジェクトを作成**: "New Project"ボタンをクリック
2. **タスクを追加**: プロジェクトを選択して"New Task"ボタンをクリック
3. **タスクを移動**: "Move →"ボタンでステータスを変更
4. **削除**: ✕ボタンでプロジェクトやタスクを削除

## 🔐 デフォルト設定

### 環境変数

**Backend (.env):**
```
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

## 🌐 GitHubへのアップロード

```bash
# Gitリポジトリを初期化
git init

# すべてのファイルを追加
git add .

# コミット
git commit -m "Initial commit: Fullstack Task Manager"

# GitHubリポジトリに接続（あなたのリポジトリURLに変更してください）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# プッシュ
git branch -M main
git push -u origin main
```

## 📱 本番環境へのデプロイ

### フロントエンド（Vercel推奨）
1. Vercelアカウントを作成
2. GitHubリポジトリを接続
3. `frontend`ディレクトリをルートとして設定
4. 環境変数に`VITE_API_URL`を設定
5. デプロイ！

### バックエンド（Render/Railway推奨）
1. Render/Railwayアカウントを作成
2. GitHubリポジトリを接続
3. `backend`ディレクトリをルートとして設定
4. 環境変数を設定
5. デプロイ！

## 🔧 トラブルシューティング

### ポートが既に使用されている
```bash
# Windowsの場合
netstat -ano | findstr :5000
taskkill /PID <PID番号> /F

# Mac/Linuxの場合
lsof -i :5000
kill -9 <PID番号>
```

### CORSエラー
- バックエンドの`.env`ファイルが正しく設定されているか確認
- フロントエンドの`.env`でAPI URLが正しいか確認

### データが保存されない
- バックエンドサーバーが起動しているか確認
- `backend/src/data/`ディレクトリの権限を確認

## 📚 詳細なドキュメント

- プロジェクト全体: `README.md`
- バックエンド: `backend/README.md`
- フロントエンド: `frontend/README.md`

## 🎨 ポートフォリオ向けのポイント

このプロジェクトは以下のスキルを証明します：

✅ フルスタック開発（React + Node.js）
✅ TypeScriptによる型安全な開発
✅ RESTful API設計
✅ JWT認証の実装
✅ WebSocketによるリアルタイム通信
✅ レスポンシブデザイン
✅ 状態管理（Context API）
✅ 適切なプロジェクト構造
✅ エラーハンドリング
✅ セキュリティベストプラクティス

## 💡 今後の拡張案

- データベース移行（PostgreSQL/MongoDB）
- ファイル添付機能
- タスクへのコメント機能
- 期限設定とリマインダー
- チーム協業機能
- ダークモード
- 検索・フィルタリング機能
- データエクスポート
- モバイルアプリ化

## ❓ サポート

問題が発生した場合は、GitHubでIssueを作成してください。

Happy Coding! 🚀
