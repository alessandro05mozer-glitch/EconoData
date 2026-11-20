import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { useStore } from './lib/store'
import { Dashboard } from './pages/Dashboard'
import { Review } from './pages/Review'
import { Playground } from './pages/Playground'
import { Settings } from './pages/Settings'
import { TrackPage, Tracks } from './pages/Tracks'

const LessonPage = lazy(() => import('./pages/LessonPage').then((m) => ({ default: m.LessonPage })))

export default function App() {
  const ready = useStore((s) => s.ready)
  const init = useStore((s) => s.init)
  useEffect(() => {
    void init()
  }, [init])

  if (!ready) return <p className="p-8 text-muted">Carregando…</p>

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="laboratorio" element={<Tracks kind="code" />} />
          <Route path="laboratorio/livre" element={<Playground />} />
          <Route path="teoria" element={<Tracks kind="theory" />} />
          <Route path="trilhas/:trackId" element={<TrackPage />} />
          <Route path="licao/:lessonId" element={<Suspense fallback={<p className="text-muted">Carregando lição…</p>}><LessonPage /></Suspense>} />
          <Route path="revisao" element={<Review />} />
          <Route path="ajustes" element={<Settings />} />
          <Route path="*" element={<p>Página não encontrada.</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
