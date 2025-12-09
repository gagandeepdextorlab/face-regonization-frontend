import { useState, useRef } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function Login({ onSuccess }) {
  const [photo, setPhoto] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const webcamRef = useRef(null)

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    setPhoto(imageSrc)
  }

  const checkAttendance = async () => {
    if (!photo) return
    setLoading(true)
    try {
      const res = await axios.post('/api/recognize', { image: photo })
      setResult(res.data)
      if (res.data.recognized) {
        onSuccess?.()
      }
    } catch (err) {
      setResult({ recognized: false, message: err.response?.data?.message || "Server error" })
    }
    setLoading(false)
  }

  return (
    <motion.div className="max-w-2xl mx-auto">
      <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/30">
        <h2 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
          Welcome Back!
        </h2>

        <div className="relative">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full rounded-2xl shadow-2xl border-8 border-white/40"
          />
          <div className="absolute inset-0 rounded-2xl border-4 border-dashed border-white/50 pointer-events-none" />
        </div>

        <div className="flex gap-6 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={capture}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl"
          >
            Capture Photo
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={checkAttendance}
            disabled={!photo || loading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl disabled:opacity-50"
          >
            {loading ? "Verifying..." : "MARK ATTENDANCE"}
          </motion.button>
        </div>

        {photo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center"
          >
            <img src={photo} alt="captured" className="mx-auto rounded-2xl shadow-2xl max-w-sm" />
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`mt-10 p-8 rounded-3xl text-center text-2xl font-bold ${
              result.recognized
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                : 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
            } shadow-2xl`}
          >
            {result.recognized ? (
              <>
                Welcome {result.name}!
                <div className="text-6xl mt-4">Success</div>
              </>
            ) : (
              <>
                Access Denied
                <p className="text-lg mt-4 opacity-90">{result.message}</p>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}