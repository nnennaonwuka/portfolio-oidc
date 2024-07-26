import App from "@/app";
//import AuthRoute from "@routes/auth.route";
import IndexRoute from "@routes/index.route";
import MeetingConfigRoute from "./routes/meeting-config.route";
import SurveyQuestionRoute from "./routes/survey-question.route";
import SurveyLogRoute from "./routes/survey-log.route";
import SocialCallLog from "./routes/social-call-log.route";
import SurveyAnswerRoute from "./routes/survey-answer.route";
import SurveyConfigRoute from "./routes/survey-config.route";
import FaqConfigRoute from "./routes/faq-config.route";
import MemberEditRoute from "./routes/member-edit.route";
import SuggestedFaqRoute from "./routes/suggested-faq.route";
import FaqRoute from "./routes/faq.route";
import FaqLogRoute from "./routes/faq-log.route";
import MeetingLogRoute from "./routes/meeting-log.route";
import MeetingLogAttendanceRoute from "./routes/meeting-log-attendance.route";
import ActivityLogRoute from "./routes/activity-log.route";
import KnowledgeLogRoute from "./routes/knowledge-log.route";
import PortfolioMediaRoute from "./routes/portfolio-media.route";
import FileUploadRoute from "./routes/file-upload.route";
import MemberGeneratedRfRoute from "./routes/member-generated-rf.route";
import validateEnv from "@utils/validateEnv";
import MemberCollectionCenterUpdateRoute from "./routes/member-collection-center-update.route";
import MemberUnavailableRoute from "./routes/member-unavailable.route";
import NewMemberDetailsRoute from "./routes/new-member-details.route";
import TransferRoute from "./routes/transfer.route";
import StaffGeneratedRfRoute from "./routes/staff-generated-rf.route";
import DefaultingTgRoute from "./routes/defaulting-tg.route";
import PaymentTrackerRoute from "./routes/payment-tracker.route";
import PaymentTransactionsRoute from "./routes/payment-transactions.route";
import PaymentTimelineRoute from "./routes/payment-timeline-route";
import DefaultRfLogRoute from "./routes/default-rf-log.route";
import SelfDepositDetailsRoute from "./routes/self-deposit-details.route";
import TransferDetailsRoute from "./routes/transfer-details.route";
import VisitationQuestionsRoute from "./routes/visitation-questions.route";
import VisitationInformationRoute from "./routes/visitation-information.route";
import DepositsRoute from "./routes/deposits.route";
import ConfirmedDepositsRoute from "./routes/confirmed-deposits.route";
import WalletDetailsRoute from "./routes/wallet-details.route";
import PaymentDetailsRoute from "./routes/payment_details.route";
import PortfolioManagementAssignmentRoute from "./routes/portfolio_management.route";
import CommissionChargeDetailsController from "./controllers/commission_charge_details.controller";

//Payment claims endpoints
import PaymentClaimsRoute from "./routes/payment-claims.route";
import ReceiptDetailsRoute from "./routes/receipt_details.route";
import { ReceiptGeneratorService } from "./services/receipt_generator.service";

import cron from "node-cron";
import ReferenceDepositsRoute from "./routes/reference-deposits.route";
import ReceiptPaymentDownloadRoute from "./routes/payment-receipts.route";
import BankCardAssignmentInfoRoute from "./routes/bank_card_assignment_info.route";
import DeliverableItemsRoute from "./routes/routes/deliverable_items.route";
import DeliveredItemsRoute from "./routes/delivered_items.route";
import TrustGroupGeneratedRfRoute from "./routes/trust_group_generated_rf.route";
import RankRoute from "./routes/rank.route";
import CommissionChargeDetailsRoute from "./routes/commission_charge_details.route";
import MeetingsRoute from "./routes/meetings.route";
import MeetingAttendeesRoute from "./routes/meeting_attendees.route";
import OperatorPerformanceRoute from "./routes/operator_performance.route";
import MeetingRoomsRoute from "./routes/meeting_rooms.route";
import HrPrepaidCardsRoute from "./routes/hr_prepaid_cards.route";
import BankCardVerificationRoute from "./routes/bank_card_verification.route";

validateEnv();

const app = new App([
  new IndexRoute(),
  //new AuthRoute(),
  new SurveyQuestionRoute(),
  new SocialCallLog(),
  new MeetingConfigRoute(),
  new SurveyAnswerRoute(),
  new SurveyLogRoute(),
  new SurveyConfigRoute(),
  new SuggestedFaqRoute(),
  new MemberEditRoute(),
  new FaqLogRoute(),
  new MemberCollectionCenterUpdateRoute(),
  new FaqRoute(),
  new FaqConfigRoute(),
  new MeetingLogRoute(),
  new MeetingLogAttendanceRoute(),
  new ActivityLogRoute(),
  new KnowledgeLogRoute(),
  new PortfolioMediaRoute(),
  new FileUploadRoute(),
  new MemberGeneratedRfRoute(),
  new MemberUnavailableRoute(),
  new NewMemberDetailsRoute(),
  new TransferRoute(),
  new StaffGeneratedRfRoute(),
  new DefaultingTgRoute(),
  new PaymentTrackerRoute(),
  new PaymentTransactionsRoute(),
  new PaymentTimelineRoute(),
  new DefaultRfLogRoute(),
  new SelfDepositDetailsRoute(),
  new TransferDetailsRoute(),
  new VisitationQuestionsRoute(),
  new VisitationInformationRoute(),
  new DepositsRoute(),
  new ConfirmedDepositsRoute(),
  new WalletDetailsRoute(),
  new PaymentDetailsRoute(),
  new PaymentClaimsRoute(),
  new ReceiptDetailsRoute(),
  new ReferenceDepositsRoute(),
  new ReceiptPaymentDownloadRoute(),
  new BankCardAssignmentInfoRoute(),
  new DeliverableItemsRoute(),
  new DeliveredItemsRoute(),
  new TrustGroupGeneratedRfRoute(),
  new RankRoute(),
  new PortfolioManagementAssignmentRoute(),
  new CommissionChargeDetailsRoute(),
  new MeetingsRoute(),
  new MeetingAttendeesRoute(),
  new OperatorPerformanceRoute(),
  new MeetingRoomsRoute(),
  new HrPrepaidCardsRoute(),
  new BankCardVerificationRoute(),
]);

app.listen();
