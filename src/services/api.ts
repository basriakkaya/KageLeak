import axios from 'axios';

const HIBP_API_URL = 'https://haveibeenpwned.com/api/v3';
const API_KEY = 'YOUR_API_KEY'; // HIBP API anahtarınızı buraya ekleyin

export interface Breach {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  ModifiedDate: string;
  PwnCount: number;
  Description: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
}

export const checkEmail = async (email: string): Promise<{ leaked: boolean; breaches: Breach[] }> => {
  try {
    const response = await axios.get(`${HIBP_API_URL}/breachedaccount/${encodeURIComponent(email)}`, {
      headers: {
        'hibp-api-key': API_KEY,
        'user-agent': 'KageLeak'
      }
    });

    return {
      leaked: true,
      breaches: response.data
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      return {
        leaked: false,
        breaches: []
      };
    }
    throw error;
  }
}; 