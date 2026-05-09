'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/* =========================
   Types
========================= */

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export type AddressInput = Omit<Address, 'id'>;

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

type AuthError = string | null;

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError;

  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;

  updateProfile: (data: Partial<User>) => void;

  addAddress: (address: AddressInput) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  resetPassword: (email: string) => Promise<boolean>;
  clearError: () => void;
};

/* =========================
   Storage helpers
========================= */

const STORAGE_KEY = 'luxe-registered-users';

type StoredUser = {
  email: string;
  password: string;
  user: User;
};

const getStoredUsers = (): StoredUser[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as StoredUser[];
  } catch {
    return [];
  }
};

const saveStoredUsers = (users: StoredUser[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

/* =========================
   Mock DB
========================= */

const mockUsers: StoredUser[] = [
  {
    email: 'demo@luxe.com',
    password: 'demo123',
    user: {
      id: '1',
      email: 'demo@luxe.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date().toISOString(),
      addresses: [
        {
          id: 'addr-1',
          label: 'Home',
          firstName: 'John',
          lastName: 'Doe',
          street: '123 Main Street',
          apartment: 'Apt 4B',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'United States',
          phone: '+1 (555) 123-4567',
          isDefault: true
        }
      ]
    }
  }
];

/* =========================
   Store
========================= */

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      /* -------------------------
         LOGIN
      ------------------------- */
      login: async (email, password) => {
        set({ isLoading: true, error: null });

        await new Promise((r) => setTimeout(r, 800));

        const stored = [...mockUsers, ...getStoredUsers()];

        const found = stored.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!found) {
          set({
            isLoading: false,
            error: 'Invalid email or password'
          });
          return false;
        }

        set({
          user: found.user,
          isAuthenticated: true,
          isLoading: false
        });

        return true;
      },

      /* -------------------------
         REGISTER
      ------------------------- */
      register: async (data) => {
        set({ isLoading: true, error: null });

        await new Promise((r) => setTimeout(r, 800));

        const stored = getStoredUsers();

        const exists = [...mockUsers, ...stored].some(
          (u) => u.email.toLowerCase() === data.email.toLowerCase()
        );

        if (exists) {
          set({
            isLoading: false,
            error: 'User already exists'
          });
          return false;
        }

        const newUser: User = {
          id: `user-${Date.now()}`,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          createdAt: new Date().toISOString(),
          addresses: []
        };

        const updated = [
          ...stored,
          {
            email: data.email,
            password: data.password,
            user: newUser
          }
        ];

        saveStoredUsers(updated);

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false
        });

        return true;
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          error: null
        }),

      updateProfile: (data) => {
        const user = get().user;
        if (!user) return;

        set({
          user: { ...user, ...data }
        });
      },

      /* -------------------------
         ADD ADDRESS
      ------------------------- */
      addAddress: (address) => {
        const user = get().user;
        if (!user) return;

        const newAddress: Address = {
          ...address,
          id: `addr-${Date.now()}`
        };

        const addresses = user.addresses ?? [];

        const updated = address.isDefault
          ? addresses.map((a) => ({ ...a, isDefault: false }))
          : addresses;

        set({
          user: {
            ...user,
            addresses: [...updated, newAddress]
          }
        });
      },

      updateAddress: (id, address) => {
        const user = get().user;
        if (!user) return;

        let addresses = user.addresses.map((a) => (a.id === id ? { ...a, ...address } : a));

        if (address.isDefault) {
          addresses = addresses.map((a) => (a.id === id ? a : { ...a, isDefault: false }));
        }

        set({
          user: {
            ...user,
            addresses
          }
        });
      },

      removeAddress: (id) => {
        const user = get().user;
        if (!user) return;

        set({
          user: {
            ...user,
            addresses: user.addresses.filter((a) => a.id !== id)
          }
        });
      },

      setDefaultAddress: (id) => {
        const user = get().user;
        if (!user) return;

        set({
          user: {
            ...user,
            addresses: user.addresses.map((a) => ({
              ...a,
              isDefault: a.id === id
            }))
          }
        });
      },

      resetPassword: async () => {
        set({ isLoading: true });

        await new Promise((r) => setTimeout(r, 800));

        set({ isLoading: false });

        return true;
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'luxe-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
