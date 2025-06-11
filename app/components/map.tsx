"use client"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-minimap/dist/Control.MiniMap.min.css"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect, useState } from "react"
import L from "leaflet"
import "leaflet-minimap"

const position: [number, number] = [37.7749, -122.4194] // SF

// Custom Arrow Icon Component
const CustomArrowIcon = ({ isExpanded, onClick }: { isExpanded: boolean; onClick: () => void }) => (
  <div className="custom-minimap-toggle" onClick={onClick}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  </div>
)

// Enhanced MiniMap control with hover functionality
const MiniMapControl = () => {
  const map = useMap()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Dark blue tile layer for minimap
    const miniMapLayer = new L.TileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>',
    })

    const miniMap = new (L.Control as any).MiniMap(miniMapLayer, {
      toggleDisplay: true,
      minimized: !isExpanded,
      position: "bottomright",
      width: 180,
      height: 180,
      collapsedWidth: 40,
      collapsedHeight: 40,
      zoomLevelOffset: -5,
      zoomAnimation: true,
      autoToggleDisplay: false,
      aimingRectOptions: {
        color: "#3b82f6",
        weight: 3,
        fillOpacity: 0.1,
        fillColor: "#3b82f6",
      },
      shadowRectOptions: {
        color: "#1e40af",
        weight: 1,
        opacity: 0.8,
        fillOpacity: 0.2,
      },
    }).addTo(map)

    // Get the minimap container
    const minimapContainer = miniMap._container

    if (minimapContainer) {
      // Add custom classes
      minimapContainer.classList.add("custom-minimap")

      // Hide on mobile by default
      if (isMobile) {
        minimapContainer.classList.add("mobile-hidden")
      }

      // Add hover functionality
      let hoverTimeout: NodeJS.Timeout

      const handleMouseEnter = () => {
        if (!isExpanded && !isMobile) {
          clearTimeout(hoverTimeout)
          miniMap._restore()
          setIsExpanded(true)
          minimapContainer.classList.add("expanded")
        }
      }

      const handleMouseLeave = () => {
        if (isExpanded && !isMobile) {
          hoverTimeout = setTimeout(() => {
            miniMap._minimize()
            setIsExpanded(false)
            minimapContainer.classList.remove("expanded")
          }, 1000) // 1 second delay before collapsing
        }
      }

      // Add event listeners
      minimapContainer.addEventListener("mouseenter", handleMouseEnter)
      minimapContainer.addEventListener("mouseleave", handleMouseLeave)

      // Custom toggle functionality
      const toggleButton = minimapContainer.querySelector(".leaflet-control-minimap-toggle-display")
      if (toggleButton) {
        toggleButton.addEventListener("click", () => {
          setIsExpanded(!isExpanded)
        })
      }
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
      miniMap.remove()
    }
  }, [map, isExpanded, isMobile])

  return null
}

const Map = () => {
  // Fix marker icons
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    })
  }, [])

  return (
    <div className="map-wrapper">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "0.75rem",
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        }}
        dragging={true}
        touchZoom={true}
        doubleClickZoom={true}
        boxZoom={true}
        keyboard={true}
        className="modern-map"
      >
        {/* Light OpenStreetMap for main map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <Marker position={position}>
          <Popup className="custom-popup">
            <div className="popup-content">
              <h3 className="font-semibold text-gray-800">Office Address</h3>
              <p className="text-gray-600">123 Commerce Street</p>
              <p className="text-gray-600">San Francisco, CA</p>
            </div>
          </Popup>
        </Marker>

        <MiniMapControl />
      </MapContainer>
    </div>
  )
}

export default Map
