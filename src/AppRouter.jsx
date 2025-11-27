import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import MyPageLayout from "./components/layouts/MyPageLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AddPaymentPage from "./pages/payment/AddPaymentPage";

// pages
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/search/SearchPage";
import HotelListPage from "./pages/search/HotelListPage";
import HotelDetailPage from "./pages/hotel/HotelDetailPage";

import BookingStepLayout from "./pages/booking/BookingStepLayout";
import BookingStepDates from "./pages/booking/BookingStepDates";
import BookingStepRoom from "./pages/booking/BookingStepRoom";
import BookingStepExtras from "./pages/booking/BookingStepExtras";
import BookingStepPayment from "./pages/booking/BookingStepPayment";
import BookingComplete from "./pages/booking/BookingComplete";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import KakaoCallbackPage from "./pages/auth/KakaoCallbackPage";
import GoogleCallbackPage from "./pages/auth/GoogleCallbackPage";

import MyOverviewPage from "./pages/mypage/MyOverviewPage";
import MyAccountPage from "./pages/mypage/MyAccountPage";
import MyPaymentPage from "./pages/mypage/MyPaymentPage";
import ProfilePage from "./pages/mypage/ProfilePage";
import MyBookingsPage from "./pages/mypage/MyBookingsPage";
import MyBookingDetailPage from "./pages/mypage/MyBookingDetailPage";
import MyReviewsPage from "./pages/mypage/MyReviewsPage";
import WishlistPage from "./pages/mypage/WishlistPage";
import MyCouponsPage from "./pages/mypage/MyCouponsPage";
import MyPointsPage from "./pages/mypage/MyPointsPage";
import MyInquiriesPage from "./pages/mypage/MyInquiriesPage";

import FaqPage from "./pages/support/FaqPage";
import NoticeListPage from "./pages/support/NoticeListPage";
import NoticeDetailPage from "./pages/support/NoticeDetailPage";
import ContactPage from "./pages/support/ContactPage";

import NotFoundPage from "./pages/common/NotFoundPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ [수정됨] MainLayout 안에 고객센터 라우트를 포함시켰습니다. */}
        <Route path="/" element={<MainLayout />}>
          {/* 메인 홈 */}
          <Route index element={<HomePage />} />

          {/* 검색 / 리스트 */}
          <Route path="search" element={<SearchPage />} />
          <Route path="hotels">
            <Route index element={<HotelListPage />} />
            <Route path=":hotelId" element={<HotelDetailPage />} />
          </Route>

          {/* ✅ 고객센터 (MainLayout 내부로 이동) */}
          <Route path="support">
            <Route index element={<FaqPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="notices" element={<NoticeListPage />} />
            <Route path="notices/:noticeId" element={<NoticeDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Route>

        {/* 예약 플로우 - 로그인 필요 (헤더/푸터 없이 별도 레이아웃 사용) */}
        <Route
          path="booking/:hotelId"
          element={
            <ProtectedRoute>
              <BookingStepLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<BookingStepDates />} />
          <Route path="room" element={<BookingStepRoom />} />
          <Route path="extras" element={<BookingStepExtras />} />
          <Route path="payment" element={<BookingStepPayment />} />
          <Route path="complete" element={<BookingComplete />} />
        </Route>

        {/* 마이페이지 - 로그인 필요 (MyPageLayout 사용) */}
        <Route
          path="mypage"
          element={
            <ProtectedRoute>
              <MyPageLayout />
            </ProtectedRoute>
          }
        >
          {/* ✅ 마이페이지 메인은 보통 Overview를 보여줍니다 (Account는 별도 탭) */}
          <Route index element={<MyOverviewPage />} /> 
          <Route path="account" element={<MyAccountPage />} />
          <Route path="bookings">
            <Route index element={<MyBookingsPage />} />
            <Route path=":bookingId" element={<MyBookingDetailPage />} />
          </Route>
          <Route path="payment" element={<MyPaymentPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="reviews" element={<MyReviewsPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="coupons" element={<MyCouponsPage />} />
          <Route path="points" element={<MyPointsPage />} />
          <Route path="inquiries" element={<MyInquiriesPage />} />
        </Route>

        {/* 인증 레이아웃: 헤더 최소, 센터 정렬 등 */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          {/* 결제 수단 추가도 로그인 필요하면 ProtectedRoute로 감싸는 게 좋습니다 */}
          <Route path="add-payment" element={<AddPaymentPage />} />

          {/* 소셜 로그인 콜백 */}
          <Route path="oauth">
            <Route path="kakao/callback" element={<KakaoCallbackPage />} />
            <Route path="google/callback" element={<GoogleCallbackPage />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;