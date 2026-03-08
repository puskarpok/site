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
    """Chaldean system mapping."""
    char = char.upper()
    mapping = {
        'A': 1, 'I': 1, 'J': 1, 'Q': 1, 'Y': 1,
        'B': 2, 'K': 2, 'R': 2,
        'C': 3, 'G': 3, 'L': 3, 'S': 3,
        'D': 4, 'M': 4, 'T': 4,
        'E': 5, 'H': 5, 'N': 5, 'X': 5,
        'U': 6, 'V': 6, 'W': 6,
        'O': 7, 'Z': 7,
        'F': 8, 'P': 8
        # 9 is not assigned to letters
    }
    return mapping.get(char, 0)

def calculate_life_path(dob_str):
    """Calculate Life Path Number from DOB (expected YYYY-MM-DD or DD/MM/YYYY)."""
    # Extract all numbers from the string
    parts = re.findall(r'\d+', dob_str)
    
    if len(parts) != 3:
        # Fallback to summing all digits if format is non-standard
        digits = re.sub(r'\D', '', dob_str)
        if not digits: return 0
        total = sum(int(d) for d in digits)
        return reduce_to_single_digit(total)
    
    # Identify Year, Month, Day based on values
    # Usually: YYYY is the 4-digit one, Month/Day are 1-2 digits
    year = 0
    month = 0
    day = 0
    
    if len(parts[0]) == 4: # YYYY-MM-DD
        year = int(parts[0])
        month = int(parts[1])
        day = int(parts[2])
    elif len(parts[2]) == 4: # DD-MM-YYYY
        day = int(parts[0])
        month = int(parts[1])
        year = int(parts[2])
    else:
        # Just sum them up if we can't tell
        total = sum(reduce_to_single_digit(int(p)) for p in parts)
        return reduce_to_single_digit(total)
    
    r_year = reduce_to_single_digit(year)
    r_month = reduce_to_single_digit(month)
    r_day = reduce_to_single_digit(day)
    
    return reduce_to_single_digit(r_year + r_month + r_day)

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
