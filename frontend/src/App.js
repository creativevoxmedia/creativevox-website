import React, { Component, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import "@/App.css";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { initLenis, destroyLenis, getLenis } from "@/lib/scroll";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error("CreativeVox UI error:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="notfound">
          <p className="h2">
            Something went <span style={{color:"var(--gray)"}}>wrong</span>.
          </p>
          <button
            type="button"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = "/";
            }}
            className="btn btn--dark"
            data-testid="error-boundary-recover"
          >
            Back to Home <span className="btn__ico">→</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ScrollManager = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const SmoothScroll = () => {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);
  return null;
};

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ErrorBoundary>
          <SmoothScroll />
          <ScrollManager />
          <ScrollProgress />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BackToTop />
          <Toaster theme="dark" position="bottom-right" closeButton />
        </ErrorBoundary>
      </BrowserRouter>
    </MotionConfig>
  );
}

export default App;
