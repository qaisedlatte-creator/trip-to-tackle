import mongoose from 'mongoose'

interface Cache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var _mongooseCache: Cache
}

const cache: Cache = global._mongooseCache ?? { conn: null, promise: null }
global._mongooseCache = cache

export async function dbConnect() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not set in .env.local')

  if (cache.conn) return cache.conn

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { bufferCommands: false })
  }

  cache.conn = await cache.promise
  return cache.conn
}
