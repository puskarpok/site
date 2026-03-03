import re

def reduce_to_single_digit(number):
    """Reduce number to a single digit, except for master numbers 11 and 22."""
    if number in [11, 22]:
        return number
    
    while number > 9:
        if number in [11, 22]:
            return number
        number = sum(int(digit) for digit in str(number))
    
    return number

def get_char_value(char):
    """Pythagoras system mapping."""
    char = char.upper()
    mapping = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
        'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    }
    return mapping.get(char, 0)

def calculate_life_path(dob_str):
    """Calculate Life Path Number from DOB (DD/MM/YYYY)."""
    # Remove non-digits
    digits = re.sub(r'\D', '', dob_str)
    if not digits or len(digits) != 8:
        return 0
    
    day = reduce_to_single_digit(int(digits[0:2]))
    month = reduce_to_single_digit(int(digits[2:4]))
    year = reduce_to_single_digit(int(digits[4:8]))
    
    return reduce_to_single_digit(day + month + year)

def calculate_destiny_number(full_name):
    """Calculate Destiny Number from full name."""
    total = sum(get_char_value(char) for char in full_name if char.isalpha())
    return reduce_to_single_digit(total)

def calculate_soul_urge_number(full_name):
    """Calculate Soul Urge Number (vowels only)."""
    vowels = "AEIOU"
    total = sum(get_char_value(char) for char in full_name if char.upper() in vowels)
    return reduce_to_single_digit(total)

def calculate_personality_number(full_name):
    """Calculate Personality Number (consonants only)."""
    vowels = "AEIOU"
    total = sum(get_char_value(char) for char in full_name if char.isalpha() and char.upper() not in vowels)
    return reduce_to_single_digit(total)

def get_number_meaning(number):
    """Get meaning for a calculated number."""
    meanings = {
        1: "The Independent Leader: Ambitious, creative, and self-reliant.",
        2: "The Harmonizer: Co-operative, sensitive, and intuitive.",
        3: "The Expressive Artist: Creative, social, and optimistic.",
        4: "The Practical Builder: Disciplined, steady, and reliable.",
        5: "The Adventurous Explorer: Versatile, freedom-loving, and curious.",
        6: "The Nurturing Caretaker: Responsible, compassionate, and family-oriented.",
        7: "The Analytical Seeker: Intellectual, introspective, and spiritual.",
        8: "The Manifesting Achiever: Ambitious, powerful, and focused on success.",
        9: "The Compassionate Humanitarian: Generous, idealistic, and artistic.",
        11: "The Intuitive Visionary: Spiritual, inspired, and highly sensitive.",
        22: "The Master Builder: High potential, practical, and world-changing."
    }
    return meanings.get(number, "A significant number in your numerology chart.")

def calculate_all(full_name, dob_str):
    lp = calculate_life_path(dob_str)
    destiny = calculate_destiny_number(full_name)
    soul = calculate_soul_urge_number(full_name)
    personality = calculate_personality_number(full_name)
    
    return {
        "life_path": {"value": lp, "meaning": get_number_meaning(lp)},
        "destiny": {"value": destiny, "meaning": get_number_meaning(destiny)},
        "soul_urge": {"value": soul, "meaning": get_number_meaning(soul)},
        "personality": {"value": personality, "meaning": get_number_meaning(personality)},
    }
