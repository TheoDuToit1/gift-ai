// Cookie management utilities for UbuntuGift demo
export interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  const {
    maxAge,
    expires,
    path = '/',
    domain,
    secure,
    sameSite = 'lax'
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (maxAge) {
    cookieString += `; max-age=${maxAge}`;
  }

  if (expires) {
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  if (path) {
    cookieString += `; path=${path}`;
  }

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += '; secure';
  }

  if (sameSite) {
    cookieString += `; samesite=${sameSite}`;
  }

  document.cookie = cookieString;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
};

export const deleteCookie = (name: string, path = '/', domain?: string): void => {
  setCookie(name, '', {
    maxAge: -1,
    path,
    domain
  });
};

export const getAllCookies = (): Record<string, string> => {
  const cookies: Record<string, string> = {};
  const cookieArray = document.cookie.split(';');

  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie) {
      const [name, value] = cookie.split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    }
  }

  return cookies;
};

// UbuntuGift-specific cookie helpers
export const UBUNTU_GIFT_COOKIES = {
  ADMIN_SETTINGS: 'ubuntuGift_adminSettings',
  SERVICE_PACKAGES: 'ubuntuGift_servicePackages',
  STAFF_DATA: 'ubuntuGift_staffData',
  CALENDAR_SETTINGS: 'ubuntuGift_calendarSettings',
  ANALYTICS_DATA: 'ubuntuGift_analyticsData'
} as const;

export const saveAdminSettings = (settings: any): void => {
  setCookie(UBUNTU_GIFT_COOKIES.ADMIN_SETTINGS, JSON.stringify(settings), {
    maxAge: 86400 * 7 // 7 days
  });
};

export const getAdminSettings = (): any => {
  const settings = getCookie(UBUNTU_GIFT_COOKIES.ADMIN_SETTINGS);
  return settings ? JSON.parse(settings) : null;
};

export const saveServicePackages = (packages: any[]): void => {
  setCookie(UBUNTU_GIFT_COOKIES.SERVICE_PACKAGES, JSON.stringify(packages), {
    maxAge: 86400 * 7
  });
};

export const getServicePackages = (): any[] => {
  const packages = getCookie(UBUNTU_GIFT_COOKIES.SERVICE_PACKAGES);
  return packages ? JSON.parse(packages) : [];
};

export const saveStaffData = (staff: any[]): void => {
  setCookie(UBUNTU_GIFT_COOKIES.STAFF_DATA, JSON.stringify(staff), {
    maxAge: 86400 * 7
  });
};

export const getStaffData = (): any[] => {
  const staff = getCookie(UBUNTU_GIFT_COOKIES.STAFF_DATA);
  return staff ? JSON.parse(staff) : [];
};

export const saveCalendarSettings = (settings: any): void => {
  setCookie(UBUNTU_GIFT_COOKIES.CALENDAR_SETTINGS, JSON.stringify(settings), {
    maxAge: 86400 * 7
  });
};

export const getCalendarSettings = (): any => {
  const settings = getCookie(UBUNTU_GIFT_COOKIES.CALENDAR_SETTINGS);
  return settings ? JSON.parse(settings) : null;
};

// Clear all demo data (for testing/reset)
export const clearAllDemoData = (): void => {
  Object.values(UBUNTU_GIFT_COOKIES).forEach(cookieName => {
    deleteCookie(cookieName);
  });
};
