export const initialStations = [
  {
    id: "ST-001",
    name: "Upper River Basin - Gauge 01",
    code: "ST-001",
    type: "RIVER",
    location: "North River Valley Tributary",
    coordinates: { lat: 28.6448, lng: 77.2167 },
    elevation: 218.4,
    drainageAreaKm2: 45.2,
    dangerThresholds: {
      safe: 1.8,
      warning: 2.8,
      highRisk: 3.8,
      critical: 4.6,
      maxCapacity: 5.2
    },
    currentTelemetry: {
      waterLevel: 2.45,
      waterLevelPercentage: 47.1,
      rateOfRise: 4.2,
      rateOfRiseDirection: "rising",
      rainfallIntensity: 12.5,
      rainfall24h: 38.0,
      flowVelocity: 1.65,
      drainageDischarge: 24.8,
      waterTemperature: 18.4,
      timestamp: new Date().toISOString()
    },
    deviceHealth: {
      esp32Status: "ONLINE",
      gatewayId: "RPI-GW-01",
      protocol: "MQTT / LoRaWAN",
      batteryPercentage: 92,
      batteryVoltage: 4.14,
      solarStatus: "CHARGING",
      solarVoltage: 5.6,
      signalRssi: -64,
      packetLoss: 0.05,
      firmwareVersion: "v2.4.2-esp32-flood",
      lastPing: new Date().toISOString()
    },
    riskAnalysis: {
      riskLevel: "WATCH",
      riskScore: 42,
      factors: [
        "Moderate upstream rainfall accumulation",
        "Consistent steady rate of rise (4.2 cm/h)",
        "Adequate drainage velocity buffering surge"
      ],
      anomalies: [],
      predictedCrestTime: "4.5 hours",
      predictedCrestLevel: 3.15,
      confidence: 91,
      aiRecommendation: "Maintain standard 15-minute telemetry interval. Monitor upstream runoff tributary."
    }
  },
  {
    id: "ST-002",
    name: "Central Riverfront Promenade",
    code: "ST-002",
    type: "RIVER",
    location: "Metro Downtown Riverfront Sector 4",
    coordinates: { lat: 28.6280, lng: 77.2280 },
    elevation: 204.1,
    drainageAreaKm2: 112.8,
    dangerThresholds: {
      safe: 2.0,
      warning: 3.2,
      highRisk: 4.2,
      critical: 5.0,
      maxCapacity: 5.8
    },
    currentTelemetry: {
      waterLevel: 4.35,
      waterLevelPercentage: 75.0,
      rateOfRise: 14.8,
      rateOfRiseDirection: "rising_fast",
      rainfallIntensity: 34.0,
      rainfall24h: 76.5,
      flowVelocity: 3.20,
      drainageDischarge: 88.4,
      waterTemperature: 19.1,
      timestamp: new Date().toISOString()
    },
    deviceHealth: {
      esp32Status: "ONLINE",
      gatewayId: "RPI-GW-02",
      protocol: "HTTPS / 4G LTE",
      batteryPercentage: 84,
      batteryVoltage: 3.98,
      solarStatus: "DISCHARGING",
      solarVoltage: 2.1,
      signalRssi: -72,
      packetLoss: 0.12,
      firmwareVersion: "v2.4.2-esp32-flood",
      lastPing: new Date().toISOString()
    },
    riskAnalysis: {
      riskLevel: "HIGH RISK",
      riskScore: 84,
      factors: [
        "Rapid rate of rise (+14.8 cm/hr) approaching crest limit",
        "Heavy precipitation intensity (34 mm/hr)",
        "Downstream bottleneck causing backflow pressure"
      ],
      anomalies: [
        {
          type: "SURGE_ANOMALY",
          severity: "HIGH",
          message: "Water level acceleration exceeded historical 98th percentile"
        }
      ],
      predictedCrestTime: "1.8 hours",
      predictedCrestLevel: 4.88,
      confidence: 94,
      aiRecommendation: "Deploy Riverfront flood barriers immediately. Issue Phase 2 alert to municipal pedestrian walkways."
    }
  },
  {
    id: "ST-003",
    name: "Downtown Storm Culvert #4",
    code: "ST-003",
    type: "DRAIN",
    location: "Commercial District Main Storm Interceptor",
    coordinates: { lat: 28.6189, lng: 77.2025 },
    elevation: 201.5,
    drainageAreaKm2: 18.6,
    dangerThresholds: {
      safe: 1.2,
      warning: 1.8,
      highRisk: 2.4,
      critical: 2.9,
      maxCapacity: 3.2
    },
    currentTelemetry: {
      waterLevel: 2.98,
      waterLevelPercentage: 93.1,
      rateOfRise: 22.5,
      rateOfRiseDirection: "rising_fast",
      rainfallIntensity: 48.0,
      rainfall24h: 89.2,
      flowVelocity: 4.10,
      drainageDischarge: 42.0,
      waterTemperature: 20.0,
      timestamp: new Date().toISOString()
    },
    deviceHealth: {
      esp32Status: "ONLINE",
      gatewayId: "RPI-GW-01",
      protocol: "MQTT / LoRaWAN",
      batteryPercentage: 76,
      batteryVoltage: 3.89,
      solarStatus: "DISCHARGING",
      solarVoltage: 1.4,
      signalRssi: -81,
      packetLoss: 0.45,
      firmwareVersion: "v2.4.2-esp32-flood",
      lastPing: new Date().toISOString()
    },
    riskAnalysis: {
      riskLevel: "CRITICAL",
      riskScore: 96,
      factors: [
        "Culvert hydraulic capacity at 93.1% (Imminent street surcharge)",
        "Extreme flash runoff velocity (4.1 m/s)",
        "Storm drain intake saturation"
      ],
      anomalies: [
        {
          type: "THRESHOLD_BREACH",
          severity: "CRITICAL",
          message: "Water level breached 2.9m critical retention mark"
        },
        {
          type: "DEBRIS_RESTRICTION",
          severity: "MEDIUM",
          message: "Flow resistance index elevated by 28% indicative of partial grill blockage"
        }
      ],
      predictedCrestTime: "35 minutes",
      predictedCrestLevel: 3.18,
      confidence: 96,
      aiRecommendation: "Activate auxiliary storm pumps 01 & 02 immediately. Dispatch quick-response clearing crew for trash grates."
    }
  },
  {
    id: "ST-004",
    name: "Eastside Industrial Canal",
    code: "ST-004",
    type: "CANAL",
    location: "Logistics Hub East Bypass Canal",
    coordinates: { lat: 28.5990, lng: 77.2410 },
    elevation: 198.2,
    drainageAreaKm2: 32.4,
    dangerThresholds: {
      safe: 1.5,
      warning: 2.5,
      highRisk: 3.5,
      critical: 4.2,
      maxCapacity: 4.8
    },
    currentTelemetry: {
      waterLevel: 1.65,
      waterLevelPercentage: 34.3,
      rateOfRise: 1.1,
      rateOfRiseDirection: "stable",
      rainfallIntensity: 6.0,
      rainfall24h: 21.0,
      flowVelocity: 1.10,
      drainageDischarge: 14.5,
      waterTemperature: 19.5,
      timestamp: new Date().toISOString()
    },
    deviceHealth: {
      esp32Status: "ONLINE",
      gatewayId: "RPI-GW-03",
      protocol: "MQTT / LoRaWAN",
      batteryPercentage: 98,
      batteryVoltage: 4.21,
      solarStatus: "CHARGING",
      solarVoltage: 5.9,
      signalRssi: -58,
      packetLoss: 0.01,
      firmwareVersion: "v2.4.2-esp32-flood",
      lastPing: new Date().toISOString()
    },
    riskAnalysis: {
      riskLevel: "SAFE",
      riskScore: 18,
      factors: [
        "Normal canal water elevation",
        "Stable hydrologic gradient",
        "Ample freeboard capacity remaining"
      ],
      anomalies: [],
      predictedCrestTime: "N/A (Stable)",
      predictedCrestLevel: 1.85,
      confidence: 98,
      aiRecommendation: "All parameters nominal. Standard automated polling active."
    }
  },
  {
    id: "ST-005",
    name: "Metro Underpass & Retention Basin",
    code: "ST-005",
    type: "UNDERPASS",
    location: "Highway 102 Junction Underpass",
    coordinates: { lat: 28.5820, lng: 77.1950 },
    elevation: 192.0,
    dangerThresholds: {
      safe: 0.3,
      warning: 0.7,
      highRisk: 1.2,
      critical: 1.6,
      maxCapacity: 2.0
    },
    currentTelemetry: {
      waterLevel: 0.85,
      waterLevelPercentage: 42.5,
      rateOfRise: 6.8,
      rateOfRiseDirection: "rising",
      rainfallIntensity: 22.0,
      rainfall24h: 51.2,
      flowVelocity: 1.95,
      drainageDischarge: 16.2,
      waterTemperature: 21.0,
      timestamp: new Date().toISOString()
    },
    deviceHealth: {
      esp32Status: "ONLINE",
      gatewayId: "RPI-GW-02",
      protocol: "HTTPS / 4G LTE",
      batteryPercentage: 90,
      batteryVoltage: 4.09,
      solarStatus: "CHARGING",
      solarVoltage: 5.2,
      signalRssi: -69,
      packetLoss: 0.08,
      firmwareVersion: "v2.4.2-esp32-flood",
      lastPing: new Date().toISOString()
    },
    riskAnalysis: {
      riskLevel: "WATCH",
      riskScore: 56,
      factors: [
        "Sub-surface basin accumulation rising",
        "Traffic road clearance still safe (1.15m remaining)",
        "Underpass pump station 04 engaged at 60% duty cycle"
      ],
      anomalies: [],
      predictedCrestTime: "2.2 hours",
      predictedCrestLevel: 1.15,
      confidence: 89,
      aiRecommendation: "Verify automated traffic signal detour triggers. Stand by for lane closure if level reaches 1.2m."
    }
  },
  {
    id: "ST-006",
    name: "South Estuary Tidal Sluice Gate",
    code: "ST-006",
    type: "ESTUARY",
    location: "Tidal Outflow Control Barrier Gate",
    coordinates: { lat: 28.5600, lng: 77.2600 },
    elevation: 188.5,
    dangerThresholds: {
      safe: 2.2,
      warning: 3.5,
      highRisk: 4.6,
      critical: 5.4,
      maxCapacity: 6.0
    },
    currentTelemetry: {
      waterLevel: 3.10,
      waterLevelPercentage: 51.6,
      rateOfRise: -2.4,
      rateOfRiseDirection: "falling",
      rainfallIntensity: 8.0,
      rainfall24h: 29.0,
      flowVelocity: 2.80,
      drainageDischarge: 65.0,
      waterTemperature: 19.8,
      timestamp: new Date().toISOString()
    },
    deviceHealth: {
      esp32Status: "ONLINE",
      gatewayId: "RPI-GW-03",
      protocol: "MQTT / LoRaWAN",
      batteryPercentage: 94,
      batteryVoltage: 4.16,
      solarStatus: "CHARGING",
      solarVoltage: 5.7,
      signalRssi: -62,
      packetLoss: 0.02,
      firmwareVersion: "v2.4.2-esp32-flood",
      lastPing: new Date().toISOString()
    },
    riskAnalysis: {
      riskLevel: "SAFE",
      riskScore: 24,
      factors: [
        "Ebb tide enabling rapid gravity discharge",
        "Sluice gates 1-4 open at 80%",
        "Negative rate of rise (-2.4 cm/hr)"
      ],
      anomalies: [],
      predictedCrestTime: "Low tide in 3.1 hours",
      predictedCrestLevel: 2.40,
      confidence: 95,
      aiRecommendation: "Maintain full gravity drainage throughput to create maximum retention buffer for inland runoff."
    }
  }
];

export const initialAlerts = [
  {
    id: "ALT-2026-0891",
    stationId: "ST-003",
    stationName: "Downtown Storm Culvert #4",
    severity: "CRITICAL",
    title: "Critical Flash Flood Threshold Breached",
    description: "Water level reached 2.98m (93.1% max retention capacity). Surge rate +22.5 cm/h with intense precipitation.",
    category: "WATER_LEVEL_CRITICAL",
    status: "ACTIVE",
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    acknowledgedBy: null,
    acknowledgedAt: null,
    responseActions: []
  },
  {
    id: "ALT-2026-0890",
    stationId: "ST-002",
    stationName: "Central Riverfront Promenade",
    severity: "HIGH RISK",
    title: "Rapid River Level Rise & Overflow Warning",
    description: "Water level at 4.35m with +14.8 cm/hr surge. Pedestrian promenade inundation projected in 1.8 hours.",
    category: "RATE_OF_RISE_ALARM",
    status: "ACKNOWLEDGED",
    timestamp: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    acknowledgedBy: "Officer D. Vance (Municipal Dispatch)",
    acknowledgedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    responseActions: [
      {
        id: "ACT-01",
        action: "Riverfront Barrier Deployment",
        details: "Automated hydraulic flood gates 3A & 3B engaged. Mobile sandbag crew dispatched to Sector 4.",
        operator: "Officer D. Vance",
        timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: "ALT-2026-0888",
    stationId: "ST-005",
    stationName: "Metro Underpass & Retention Basin",
    severity: "WATCH",
    title: "Underpass Retention Inflow Advisory",
    description: "Water level rose past 0.8m. Rain intensity sustained at 22mm/h.",
    category: "WATCH_ADVISORY",
    status: "RESOLVED",
    timestamp: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
    acknowledgedBy: "Supervisor R. Chen",
    acknowledgedAt: new Date(Date.now() - 130 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    responseActions: [
      {
        id: "ACT-02",
        action: "Auxiliary Pump Activation",
        details: "Drainage pump #4 spun up to 100% capacity. Water evacuated to side retention reservoir.",
        operator: "Supervisor R. Chen",
        timestamp: new Date(Date.now() - 128 * 60 * 1000).toISOString()
      }
    ]
  }
];

export const initialResponseLogs = [
  {
    id: "LOG-5510",
    alertId: "ALT-2026-0890",
    stationId: "ST-002",
    stationName: "Central Riverfront Promenade",
    actionType: "BARRIER_DEPLOYMENT",
    actionTitle: "Deployed Hydraulic River Gates 3A & 3B",
    details: "Automated gates engaged to isolate lower promenade from river swell. Notified Metro Transit to divert riverside pedestrian traffic.",
    team: "Civil Defense Rapid Team Alpha",
    operator: "Officer D. Vance",
    status: "COMPLETED",
    timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString()
  },
  {
    id: "LOG-5509",
    alertId: "ALT-2026-0888",
    stationId: "ST-005",
    stationName: "Metro Underpass & Retention Basin",
    actionType: "PUMP_ACTIVATION",
    actionTitle: "Auxiliary High-Volume Pump 04 Engaged",
    details: "Maintained water table clearance for highway underpass. Pump discharge verified at 18.5 m3/s.",
    team: "Municipal Drainage Maintenance Unit 2",
    operator: "Supervisor R. Chen",
    status: "COMPLETED",
    timestamp: new Date(Date.now() - 128 * 60 * 1000).toISOString()
  },
  {
    id: "LOG-5508",
    alertId: null,
    stationId: "ST-003",
    stationName: "Downtown Storm Culvert #4",
    actionType: "ROUTINE_INSPECTION",
    actionTitle: "IoT Sensor Calibration & Ultrasonic Transducer Cleaned",
    details: "Dual sonar transducers inspected for silt build-up. Telemetry drift recalibrated to 0.00m reference.",
    team: "IoT Field Engineering",
    operator: "Tech Lead M. Torres",
    status: "COMPLETED",
    timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
  }
];

export const historicalEvents = [
  {
    id: "EVT-2025-09",
    title: "Monsoon Super-Cell Storm Surge",
    date: "September 14-16, 2025",
    peakRainfall24h: 142.5,
    peakWaterLevel: 5.42,
    mostAffectedStation: "Central Riverfront Promenade",
    maxRiskLevel: "CRITICAL",
    totalAlertsFired: 18,
    responseTimeAvgMin: 8.4,
    sandbagsDeployed: 4200,
    pumpsActivated: 12,
    outcome: "Flood barriers successfully mitigated 85% of downstream spill. Zero structural failure.",
    severityIndex: 9.2
  },
  {
    id: "EVT-2025-07",
    title: "Flash Urban Drainage Surcharge",
    date: "July 22, 2025",
    peakRainfall24h: 98.0,
    peakWaterLevel: 3.15,
    mostAffectedStation: "Downtown Storm Culvert #4",
    maxRiskLevel: "CRITICAL",
    totalAlertsFired: 11,
    responseTimeAvgMin: 6.2,
    sandbagsDeployed: 1200,
    pumpsActivated: 8,
    outcome: "Automated early warning allowed traffic rerouting 40 minutes prior to surface street inundation.",
    severityIndex: 8.1
  },
  {
    id: "EVT-2024-11",
    title: "River Basin Winter Runoff Event",
    date: "November 03-05, 2024",
    peakRainfall24h: 68.4,
    peakWaterLevel: 4.10,
    mostAffectedStation: "Upper River Basin - Gauge 01",
    maxRiskLevel: "HIGH RISK",
    totalAlertsFired: 6,
    responseTimeAvgMin: 12.0,
    sandbagsDeployed: 850,
    pumpsActivated: 4,
    outcome: "Upstream retention dams regulated discharge safely through the estuary sluice gates.",
    severityIndex: 6.5
  }
];
