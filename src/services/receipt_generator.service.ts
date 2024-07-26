import { EntityRepository, getConnection, Repository } from "typeorm";
import { ReceiptDetailsEntity } from "@/entities/receipt_details.entity";
import ReceiptDetailsService from "./receipt_details.service";
import axios from "axios";
import { MESSAGE_SERVICE } from "@/config";

@EntityRepository()
export class ReceiptGeneratorService extends Repository<
  ReceiptDetailsEntity[]
> {}
