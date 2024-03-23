import { NeynarAPIClient, FeedType, FilterType } from "@neynar/nodejs-sdk";
import dotenv from 'dotenv';
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const DETA_API_KEY = process.env.DETA_API_KEY;
