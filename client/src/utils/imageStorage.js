// Image Storage Utility using IndexedDB for better storage management

class ImageStorage {
  constructor() {
    this.dbName = 'CleanCityImages'
    this.dbVersion = 1
    this.storeName = 'images'
    this.db = null
  }

  // Initialize IndexedDB
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName)
        }
      }
    })
  }

  // Store image with key
  async storeImage(key, imageData) {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.put(imageData, key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // Get image by key
  async getImage(key) {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // Delete image by key
  async deleteImage(key) {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.delete(key)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // Clear all images
  async clearAllImages() {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.clear()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  // Get storage estimate
  async getStorageEstimate() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate()
        return {
          quota: estimate.quota,
          usage: estimate.usage,
          usageDetails: estimate.usageDetails
        }
      } catch (error) {
        console.error('Storage estimate error:', error)
      }
    }
    return null
  }

  // Compress image more aggressively for storage
  compressImage(dataUrl, callback, maxSizeKB = 200) {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Calculate new dimensions (max 600px)
      let width = img.width
      let height = img.height
      const maxDimension = 600
      
      if (width > height) {
        if (width > maxDimension) {
          height = (height * maxDimension) / width
          width = maxDimension
        }
      } else {
        if (height > maxDimension) {
          width = (width * maxDimension) / height
          height = maxDimension
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      
      // Try different quality levels to achieve target size
      let quality = 0.5
      const tryCompress = (attemptQuality) => {
        const compressed = canvas.toDataURL('image/jpeg', attemptQuality)
        const sizeInKB = Math.round((compressed.length * 3) / 4 / 1024)
        
        if (sizeInKB <= maxSizeKB || attemptQuality <= 0.1) {
          callback(compressed)
        } else {
          // Reduce quality and try again
          tryCompress(attemptQuality - 0.1)
        }
      }
      
      tryCompress(quality)
    }
    img.src = dataUrl
  }

  // Generate unique key for image
  generateImageKey(prefix = 'img') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Clean up old images (keep only latest 10)
  async cleanupOldImages() {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.getAllKeys()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const keys = request.result
        if (keys.length > 10) {
          // Sort keys to get oldest (timestamp-based)
          const sortedKeys = keys.sort()
          const keysToDelete = sortedKeys.slice(0, keys.length - 10)
          
          let deletedCount = 0
          keysToDelete.forEach(key => {
            const deleteRequest = store.delete(key)
            deleteRequest.onsuccess = () => {
              deletedCount++
              if (deletedCount === keysToDelete.length) {
                resolve(deletedCount)
              }
            }
          })
        } else {
          resolve(0)
        }
      }
    })
  }
}

// Export singleton instance
const imageStorage = new ImageStorage()
export default imageStorage
