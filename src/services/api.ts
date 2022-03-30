import axios from 'axios';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';

let cookies = parseCookies();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});