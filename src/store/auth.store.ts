'use client';

import { create } from 'zustand';

import {
  postAuthLogin,
  postAuthRegister,
  postAuthLogout,
  type postAuthLoginResponse,
  type postAuthRegisterResponse
} from '../services/apis/authentication';
import type { DtoLoginRequest, DtoRegisterRequest, GetUsers200Data } from '../services/models';

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

export type User = GetUsers200Data['users'];

type AuthError = string | null;

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError;

  login: (data: DtoLoginRequest) => Promise<postAuthLoginResponse>;
  register: (data: DtoRegisterRequest) => Promise<postAuthRegisterResponse>;
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

/* =========================
   Store
========================= */

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (data: DtoLoginRequest): Promise<postAuthLoginResponse> => {
    set({ isLoading: true, error: null });
    try {
      const res = await postAuthLogin({ email: data.email, password: data.password });
      if (res.status === 200 && res.data && res.data.data) {
        const user = (res.data.data as any).user || res.data.data;
        set({
          user: user || null,
          isAuthenticated: true,
          isLoading: false
        });
        return res;
      } else {
        set({
          isLoading: false,
          error: (res.data as any)?.message || 'Invalid email or password'
        });
        return res;
      }
    } catch (e) {
      set({
        isLoading: false,
        error: 'Login failed. Please try again.'
      });
      return e;
    }
  },

  register: async (data: DtoRegisterRequest): Promise<postAuthRegisterResponse> => {
    set({ isLoading: true, error: null });
    try {
      const res = await postAuthRegister(data);
      if (res.data && res.data.data) {
        const user = (res.data.data as any).user || res.data.data;
        set({
          user: user || null,
          isAuthenticated: true,
          isLoading: false
        });
        return res;
      } else {
        set({
          isLoading: false,
          error: res.data?.message || 'Registration failed'
        });
        return res;
      }
    } catch (e) {
      set({
        isLoading: false,
        error: 'Registration failed. Please try again.'
      });
      return e;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await postAuthLogout();
    } catch {}
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  },

  updateProfile: (data: Partial<User>) => {
    const user = get().user;
    if (!user) return;
    set({
      user: { ...user, ...data }
    });
  },

  addAddress: (address: AddressInput) => {
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

  updateAddress: (id: string, address: Partial<Address>) => {
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

  removeAddress: (id: string) => {
    const user = get().user;
    if (!user) return;
    set({
      user: {
        ...user,
        addresses: user.addresses.filter((a) => a.id !== id)
      }
    });
  },

  setDefaultAddress: (id: string) => {
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

  resetPassword: async (_email: string) => {
    set({ isLoading: true });
    // TODO: Implement reset password using backend API
    set({ isLoading: false });
    return true;
  },

  clearError: () => set({ error: null })
}));
