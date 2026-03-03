from django.test import TestCase
from .utils.numerology_logic import calculate_all

class NumerologyLogicTest(TestCase):
    def test_life_path_reduction(self):
        # Case: 1990-05-15 -> 1+9+9+0 + 0+5 + 1+5 = 19 + 5 + 6 = 30 -> 3
        result = calculate_all("Test User", "15051990")
        self.assertEqual(result['life_path']['value'], 3)

    def test_master_number_11(self):
        # Case: 1999-11-11
        # 1999 -> 1+9+9+9 = 28 -> 10 -> 1
        # 11 -> 11 (Master)
        # 11 -> 11 (Master)
        # 1 + 11 + 11 = 23 -> 5
        result = calculate_all("Test User", "11111999")
        self.assertEqual(result['life_path']['value'], 5)

    def test_destiny_number(self):
        # John Doe -> 1+6+8+5 + 4+6+5 = 20 + 15 = 35 -> 8
        result = calculate_all("John Doe", "01011990")
        self.assertEqual(result['destiny']['value'], 8)

    def test_soul_urge_number(self):
        # Teo -> Vowels: E(5), O(6) -> 11 (Master Number)
        result = calculate_all("Teo", "01011990")
        self.assertEqual(result['soul_urge']['value'], 11)

# Create your tests here.
