export default interface BankCardVerification {
    verification_id: string;
    bg_card_id: string;
    staff_id: string;
    gotten_ms_card_number: string;
    expected_bg_card_number: string;    
    gotten_pco_card_number: string;
    error_id: string;
    status: number;
    error_log_date: string;
    ik_number: string;
    card_holder_image_pco:string;
    card_image_pco:string;
    pan_pco:string;
    error_message:string;
    ms_staff_id:string
  }
  