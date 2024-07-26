import { EntityRepository, Repository } from "typeorm";
import { PaymentTransactionsDto } from "@dtos/payment-transactions.dto";
import { PaymentTransactionsEntity } from "@entities/payment-transactions.entity";
import { HttpException } from "@exceptions/HttpException";
import { PaymentTransactions } from "@interfaces/payment-transactions.interface";
import { isEmpty } from "@utils/util";
import CONSTANTS from "@/constants";
import { getEntityArray } from "@/helpers/constants.helper";

@EntityRepository()
class PaymentTransactionservice extends Repository<PaymentTransactionsEntity> {
  public async findAllPaymentTransactions(): Promise<PaymentTransactions[]> {
    const PaymentTransactions: PaymentTransactions[] =
      await PaymentTransactionsEntity.find();
    return PaymentTransactions;
  }

  public async findPaymentTransactionsById(
    TrackerId: string
  ): Promise<PaymentTransactions> {
    if (isEmpty(TrackerId))
      throw new HttpException(400, "You're not a TrackerId");

    const findPaymentTransactions: PaymentTransactions =
      await PaymentTransactionsEntity.findOne({
        where: { receipt_id: TrackerId },
      });
    if (!findPaymentTransactions)
      throw new HttpException(409, "You're not a PaymentTransactions");

    return findPaymentTransactions;
  }

  public async createPaymentTransactions(
    PaymentTransactionsData: PaymentTransactionsDto
  ): Promise<PaymentTransactions> {
    if (isEmpty(PaymentTransactionsData))
      throw new HttpException(400, "You're not a PaymentTransactionsData");

    const findPaymentTransactions: PaymentTransactions =
      await PaymentTransactionsEntity.findOne({
        where: {
          receipt_id: PaymentTransactionsData.receipt_id,
          payment_transaction_id:
            PaymentTransactionsData.payment_transaction_id,
        },
      });
    if (findPaymentTransactions)
      throw new HttpException(
        409,
        `The tracker_id ${PaymentTransactionsData.payment_transaction_id} and  receipt_id ${PaymentTransactionsData.receipt_id} already exists`
      );

    const createPaymentTransactionsData: PaymentTransactions =
      await PaymentTransactionsEntity.create({
        ...PaymentTransactionsData,
      }).save();

    return createPaymentTransactionsData;
  }

  public async updatePaymentTransactions(
    TrackerId: string,
    ReceiptId: string,
    PaymentTransactionsData: PaymentTransactionsDto
  ): Promise<PaymentTransactions> {
    if (isEmpty(PaymentTransactionsData))
      throw new HttpException(400, "You're not PaymentTransactionsData");

    const findPaymentTransactions: PaymentTransactions =
      await PaymentTransactionsEntity.findOne({
        where: { payment_transaction_id: TrackerId, receipt_id: ReceiptId },
      });
    if (!findPaymentTransactions)
      throw new HttpException(409, "You're not PaymentTransactions");

    await PaymentTransactionsEntity.update(
      { payment_transaction_id: TrackerId, receipt_id: ReceiptId },
      { ...PaymentTransactionsData }
    );

    const updatePaymentTransactions: PaymentTransactions =
      await PaymentTransactionsEntity.findOne({
        where: { payment_transaction_id: TrackerId, receipt_id: ReceiptId },
      });
    return updatePaymentTransactions;
  }

  public async deletePaymentTransactions(
    TrackerId: string,
    ReceiptId: string
  ): Promise<PaymentTransactions> {
    if (isEmpty(TrackerId))
      throw new HttpException(400, "You're not TrackerId");

    const findPaymentTransactions: PaymentTransactions =
      await PaymentTransactionsEntity.findOne({
        where: { payment_transaction_id: TrackerId, receipt_id: ReceiptId },
      });
    if (!findPaymentTransactions)
      throw new HttpException(409, "You're not PaymentTransactions");

    await PaymentTransactionsEntity.delete({
      payment_transaction_id: TrackerId,
      receipt_id: ReceiptId,
    });
    return findPaymentTransactions;
  }

  //sync up functionality
  public async updatePaymentTransactionsList(
    PaymentTransactionsData: PaymentTransactionsDto[]
  ): Promise<PaymentTransactions[]> {
    if (PaymentTransactionsData.length === 0)
      throw new HttpException(400, "PaymentTransactions data is empty");

    const updatedData = [];

    for (const item of PaymentTransactionsData) {
      if (item.payment_transaction_id) {
        const findExistingPaymentTransactions: PaymentTransactions =
          await PaymentTransactionsEntity.findOne({
            where: { payment_transaction_id: item.payment_transaction_id },
          });

        if (findExistingPaymentTransactions) {
          await PaymentTransactionsEntity.update(
            {
              payment_transaction_id:
                findExistingPaymentTransactions.payment_transaction_id,
            },
            { ...item }
          );
          updatedData.push({
            payment_transaction_id: item.payment_transaction_id,
            status: 1,
          });
        } else {
          const createPaymentTransactions: PaymentTransactions =
            await PaymentTransactionsEntity.create({ ...item }).save();
          updatedData.push({
            payment_transaction_id:
              createPaymentTransactions.payment_transaction_id,
            status: 1,
          });
        }
      }
    }

    return updatedData;
  }

  //sync down functionality
  public async downloadPaymentTransactionsList(
    last_sync_time: string,
    entity_id: string
  ) {
    const lastDownloadTime = new Date(last_sync_time).toISOString();

    //Check if service can be accessed by entity id passed
    const entityGroups = [CONSTANTS.SHP_PC];

    const entityArr = await getEntityArray(entityGroups);

    if (entity_id && !entityArr.includes(entity_id.trim())) {
      return [];
    }

    // Fetch data from the table
    const PaymentTransactionsList =
      await PaymentTransactionsEntity.createQueryBuilder("table")
        .select()
        .where("table.updated_at >= :lastDownloadTime", { lastDownloadTime })
        .getMany();

    return PaymentTransactionsList;
  }
}

export default PaymentTransactionservice;
