#!/usr/bin/env python3
"""
Backend API Testing for Ondosoft Newsletter and Contact APIs
Tests all CRUD operations and validates responses
"""

import requests
import sys
import json
from datetime import datetime

class APITester:
    def __init__(self, base_url="https://29a763f7-494b-4a50-be79-0a33acffe0e7.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def test_health_endpoint(self):
        """Test health check endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}, Response: {response.json() if success else response.text}"
            self.log_test("Health Check", success, details)
            return success
        except Exception as e:
            self.log_test("Health Check", False, str(e))
            return False

    def test_newsletter_subscribe_new(self):
        """Test newsletter subscription with new email"""
        test_email = f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        try:
            response = requests.post(
                f"{self.base_url}/api/newsletter/subscribe",
                json={"email": test_email},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                success = data.get("status") == "subscribed"
                details = f"Status: {response.status_code}, Response: {data}"
            else:
                success = False
                details = f"Status: {response.status_code}, Response: {response.text}"
            
            self.log_test("Newsletter Subscribe (New Email)", success, details)
            return success, test_email
        except Exception as e:
            self.log_test("Newsletter Subscribe (New Email)", False, str(e))
            return False, None

    def test_newsletter_subscribe_duplicate(self, email):
        """Test newsletter subscription with duplicate email"""
        try:
            response = requests.post(
                f"{self.base_url}/api/newsletter/subscribe",
                json={"email": email},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                success = data.get("status") == "already_subscribed"
                details = f"Status: {response.status_code}, Response: {data}"
            else:
                success = False
                details = f"Status: {response.status_code}, Response: {response.text}"
            
            self.log_test("Newsletter Subscribe (Duplicate Email)", success, details)
            return success
        except Exception as e:
            self.log_test("Newsletter Subscribe (Duplicate Email)", False, str(e))
            return False

    def test_newsletter_subscribe_invalid_email(self):
        """Test newsletter subscription with invalid email"""
        try:
            response = requests.post(
                f"{self.base_url}/api/newsletter/subscribe",
                json={"email": "invalid-email"},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 422 for validation error
            success = response.status_code == 422
            details = f"Status: {response.status_code}, Response: {response.text}"
            
            self.log_test("Newsletter Subscribe (Invalid Email)", success, details)
            return success
        except Exception as e:
            self.log_test("Newsletter Subscribe (Invalid Email)", False, str(e))
            return False

    def test_get_subscribers(self):
        """Test getting newsletter subscribers"""
        try:
            response = requests.get(f"{self.base_url}/api/newsletter/subscribers", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                success = "subscribers" in data and "total" in data
                details = f"Status: {response.status_code}, Total subscribers: {data.get('total', 'N/A')}"
            else:
                success = False
                details = f"Status: {response.status_code}, Response: {response.text}"
            
            self.log_test("Get Newsletter Subscribers", success, details)
            return success
        except Exception as e:
            self.log_test("Get Newsletter Subscribers", False, str(e))
            return False

    def test_contact_submit(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com",
            "phone": "+1234567890",
            "company": "Test Company",
            "message": "This is a test message",
            "source": "website"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/contact/submit",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                success = data.get("status") == "success"
                details = f"Status: {response.status_code}, Response: {data}"
            else:
                success = False
                details = f"Status: {response.status_code}, Response: {response.text}"
            
            self.log_test("Contact Form Submit", success, details)
            return success
        except Exception as e:
            self.log_test("Contact Form Submit", False, str(e))
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Backend API Tests...")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)

        # Test health endpoint first
        if not self.test_health_endpoint():
            print("❌ Health check failed - backend may be down")
            return False

        # Test newsletter functionality
        success, test_email = self.test_newsletter_subscribe_new()
        if success and test_email:
            self.test_newsletter_subscribe_duplicate(test_email)
        
        self.test_newsletter_subscribe_invalid_email()
        self.test_get_subscribers()
        
        # Test contact form
        self.test_contact_submit()

        # Print summary
        print("=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed")
            return False

def main():
    """Main test runner"""
    tester = APITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open("/app/test_reports/backend_test_results.json", "w") as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "total_tests": tester.tests_run,
            "passed_tests": tester.tests_passed,
            "success_rate": f"{(tester.tests_passed/tester.tests_run)*100:.1f}%" if tester.tests_run > 0 else "0%",
            "results": tester.test_results
        }, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())