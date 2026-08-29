import psutil
import time
import asyncio

class TelemetryService:
    def __init__(self):
        self.last_net_io = psutil.net_io_counters()
        self.last_net_time = time.time()
        
    def get_system_metrics(self):
        # CPU
        cpu_percent = psutil.cpu_percent(interval=None)
        
        # RAM
        mem = psutil.virtual_memory()
        ram_percent = mem.percent
        
        # Disk (Assuming C: on Windows or root on Unix)
        try:
            disk = psutil.disk_usage('C:\\')
        except:
            disk = psutil.disk_usage('/')
        disk_percent = disk.percent
        
        # Sensors / Temps (Windows may not support this natively via psutil, fallback to UNAVAILABLE if empty)
        temps = {}
        try:
            if hasattr(psutil, "sensors_temperatures"):
                raw_temps = psutil.sensors_temperatures()
                if raw_temps:
                    for name, entries in raw_temps.items():
                        temps[name] = entries[0].current
        except:
            pass

        # Network Mbps
        current_net_io = psutil.net_io_counters()
        current_net_time = time.time()
        dt = current_net_time - self.last_net_time
        
        if dt > 0:
            bytes_sent = current_net_io.bytes_sent - self.last_net_io.bytes_sent
            bytes_recv = current_net_io.bytes_recv - self.last_net_io.bytes_recv
            # Convert to Mbps
            mbps_sent = (bytes_sent * 8) / (1024 * 1024) / dt
            mbps_recv = (bytes_recv * 8) / (1024 * 1024) / dt
        else:
            mbps_sent = 0.0
            mbps_recv = 0.0
            
        self.last_net_io = current_net_io
        self.last_net_time = current_net_time

        return {
            "type": "telemetry",
            "timestamp": current_net_time,
            "data": {
                "cpu": {"value": cpu_percent, "status": "LIVE"},
                "ram": {"value": ram_percent, "status": "LIVE"},
                "disk": {"value": disk_percent, "status": "LIVE"},
                "network": {
                    "upload": round(mbps_sent, 2),
                    "download": round(mbps_recv, 2),
                    "status": "LIVE"
                },
                "temperature": temps if temps else {"status": "UNAVAILABLE"}
            }
        }

telemetry_service = TelemetryService()
