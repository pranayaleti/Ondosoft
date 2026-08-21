import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { portalAPI, adminAPI } from '../utils/auth.js';
import { useAuth } from '../contexts/AuthContext';

const NotificationCenter = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    if (!user) return undefined;

    fetchNotifications();
    // Pause polling when the tab is hidden so we don't burn requests / battery.
    let interval = null;
    const startInterval = () => {
      if (interval) return;
      interval = setInterval(fetchNotifications, 30000);
    };
    const stopInterval = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    startInterval();
    const onVisibility = () => {
      if (document.hidden) stopInterval();
      else {
        fetchNotifications();
        startInterval();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      isMountedRef.current = false;
      stopInterval();
      document.removeEventListener('visibilitychange', onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin]);

  const fetchNotifications = async () => {
    if (isMountedRef.current) setLoading(true);
    try {
      const data = isAdmin
        ? await adminAPI.getNotifications()
        : await portalAPI.getNotifications();
      if (!isMountedRef.current) return;
      const now = new Date();
      const filtered = (data.notifications || []).filter((n) => {
        if (n.is_dismissed) return false;
        if (n.remind_at) return new Date(n.remind_at) <= now;
        return true;
      });
      setNotifications(filtered);
    } catch (err) {
      if (isMountedRef.current) console.error('Failed to fetch notifications:', err);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;
  const notificationsPath = isAdmin ? '/admin/notifications' : '/dashboard/notifications';
  const isActive = location.pathname === notificationsPath;

  return (
    <Link
      to={notificationsPath}
      className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
        isActive
          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
      aria-label="Notifications"
    >
      <Bell className="w-4 h-4 flex-shrink-0" />
      <span className="truncate flex-1 text-left">Notifications</span>
      {unreadCount > 0 && (
        <span className="w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </Link>
  );
};

export default NotificationCenter;
