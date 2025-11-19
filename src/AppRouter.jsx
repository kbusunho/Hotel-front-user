import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 레이아웃
import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import MyPageLayout from "./components/layouts/MyPageLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

// 페이지 - 홈/검색
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/search/SearchPage";
import HotelListPage from "./pages/search/HotelListPage";
import HotelDetailPage from "./pages/hotel/HotelDetailPage";

// 페이지 - 예약
import BookingStepLayout from "./pages/booking/BookingStepLayout";
import BookingStepDates from "./pages/booking/BookingStepDates";
import BookingStepRoom from "./pages/booking/BookingStepRoom";
import BookingStepExtras from "./pages/booking/BookingStepExtras";
import BookingStepPayment from "./pages/booking/BookingStepPayment";
import BookingComplete from "./pages/booking/BookingComplete";

// 페이지 - 인증
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import KakaoCallbackPage from "./pages/auth/KakaoCallbackPage";
import GoogleCallbackPage from "./pages/auth/GoogleCallbackPage";

// 페이지 - 마이페이지
import MyOverviewPage from "./pages/mypage/MyOverviewPage";
import ProfilePage from "./pages/mypage/ProfilePage";
import MyBookingsPage from "./pages/mypage/MyBookingsPage";
import MyBookingDetailPage from "./pages/mypage/MyBookingDetailPage";
import MyReviewsPage from "./pages/mypage/MyReviewsPage";
import WishlistPage from "./pages/mypage/WishlistPage";
import MyCouponsPage from "./pages/mypage/MyCouponsPage";
import MyPointsPage from "./pages/mypage/MyPointsPage";
import MyInquiriesPage from "./pages/mypage/MyInquiriesPage";

// 페이지 - 고객센터
import FaqPage from "./pages/support/FaqPage";
import NoticeListPage from "./pages/support/NoticeListPage";
import NoticeDetailPage from "./pages/support/NoticeDetailPage";
import ContactPage from "./pages/support/ContactPage";

// 페이지 - 공통
import NotFoundPage from "./pages/common/NotFoundPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. 메인 레이아웃 (헤더+푸터 있음) */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          
          <Route path="search" element={<SearchPage />} />
          <Route path="hotels">
            <Route index element={<HotelListPage />} />
            <Route path=":hotelId" element={<HotelDetailPage />} />
          </Route>

          {/* 예약 (로그인 필요) */}
          <Route path="booking/:hotelId" element={<ProtectedRoute><BookingStepLayout /></ProtectedRoute>}>
            <Route index element={<BookingStepDates />} />
            <Route path="room" element={<BookingStepRoom />} />
            <Route path="extras" element={<BookingStepExtras />} />
            <Route path="payment" element={<BookingStepPayment />} />
            <Route path="complete" element={<BookingComplete />} />
          </Route>

          {/* 마이페이지 (로그인 필요 + 사이드바 레이아웃) */}
          <Route path="mypage" element={<ProtectedRoute><MyPageLayout /></ProtectedRoute>}>
            <Route index element={<MyOverviewPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="bookings" element={<MyBookingsPage />} />
            <Route path="bookings/:bookingId" element={<MyBookingDetailPage />} />
            <Route path="reviews" element={<MyReviewsPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="coupons" element={<MyCouponsPage />} />
            <Route path="points" element={<MyPointsPage />} />
            <Route path="inquiries" element={<MyInquiriesPage />} />
          </Route>

          {/* 고객센터 */}
          <Route path="support">
            <Route index element={<FaqPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="notices" element={<NoticeListPage />} />
            <Route path="notices/:noticeId" element={<NoticeDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Route>

        {/* 2. 인증 레이아웃 (헤더/푸터 심플하거나 없음) */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="oauth/kakao/callback" element={<KakaoCallbackPage />} />
          <Route path="oauth/google/callback" element={<GoogleCallbackPage />} />
        </Route>

        {/* 404 페이지 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;