import { Response, NextFunction } from "express";
import axios, { AxiosInstance } from "axios";
import { HttpException } from "../exceptions/HttpException";
import { SSO_BASE_URL } from "../config";
import { RequestWithUser } from "../interfaces/auth.interface";

class AuthService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async callAPI<T>(method: "POST" | "PUT" | "GET", url: string, token: string, data?: object): Promise<T> {
    try {
      const response = await this.axiosInstance({
        method,
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });
      return response.data;
    } catch (error) {
      throw new HttpException(401, "User is not so authorized to perform this action");
    }
  }

  async validateToken(token: string, appId: string): Promise<any> {
    const data: any = { app_id: appId }; // Replace with your app ID

    return this.callAPI("POST", `${SSO_BASE_URL}/validate_request`, token, data);
  }
}

const authService = new AuthService();

// Get the authorization header from the request
const getAuthorization = (req) => {
  const cookie = req.cookies["Authorization"];
  if (cookie) return cookie;

  const header = req.header("Authorization");
  if (header) return header.split("Bearer ")[1];

  return null;
};

const validateUserMiddleware = (appId: string) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
    
  const token = getAuthorization(req);

  if (!token) {
    next(new HttpException(401, "User is not so authorized to perform this action"));
  }

  try {
    const result = await authService.validateToken(token, appId);

    if (!result) {
      next(new HttpException(401, "User is not so authorized to perform this action"));
    }

    // Attach the result to the request object for further use in the next middleware or route handler
    req.user = result;
    // console.log(req.user)
    next();
  } catch (error) {
    next(error);
  }
};

export default validateUserMiddleware;
