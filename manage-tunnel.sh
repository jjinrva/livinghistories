#!/bin/bash

case "$1" in
    start)
        echo "🚀 Starting Living Histories platform..."
        cd /opt/livinghistories
        docker compose up -d
        echo "✅ Platform started!"
        echo "🔗 Tunnel status:"
        sudo systemctl status cloudflared --no-pager -l
        ;;
    stop)
        echo "⏹️  Stopping Living Histories platform..."
        cd /opt/livinghistories
        docker compose down
        echo "✅ Platform stopped!"
        echo "ℹ️  Cloudflare tunnel still running (system service)"
        ;;
    restart)
        echo "🔄 Restarting Living Histories platform..."
        cd /opt/livinghistories
        docker compose restart
        echo "✅ Platform restarted!"
        ;;
    logs)
        echo "📋 Showing Docker logs..."
        cd /opt/livinghistories
        docker compose logs -f
        ;;
    tunnel-logs)
        echo "📋 Showing Cloudflare tunnel logs..."
        sudo journalctl -u cloudflared -f
        ;;
    status)
        echo "📊 Platform status:"
        cd /opt/livinghistories
        docker compose ps
        echo ""
        echo "🔗 Cloudflare tunnel status:"
        sudo systemctl status cloudflared --no-pager
        ;;
    test)
        echo "🧪 Testing platform..."
        echo "Local health check:"
        curl -s http://localhost/health || echo "❌ Local test failed"
        echo ""
        echo "Cloudflare tunnel status:"
        sudo systemctl is-active cloudflared
        echo ""
        echo "Public health check (may fail if DNS not propagated):"
        curl -s https://history.jonestran.online/health || echo "⚠️  Public test failed (DNS may not be ready)"
        ;;
    tunnel-restart)
        echo "🔄 Restarting Cloudflare tunnel..."
        sudo systemctl restart cloudflared
        sleep 5
        sudo systemctl status cloudflared --no-pager
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|logs|tunnel-logs|status|test|tunnel-restart}"
        echo ""
        echo "Commands:"
        echo "  start         - Start Docker containers"
        echo "  stop          - Stop Docker containers"
        echo "  restart       - Restart Docker containers"
        echo "  logs          - Show Docker container logs"
        echo "  tunnel-logs   - Show Cloudflare tunnel logs"
        echo "  status        - Show status of all services"
        echo "  test          - Test connectivity"
        echo "  tunnel-restart- Restart Cloudflare tunnel service"
        exit 1
        ;;
esac
