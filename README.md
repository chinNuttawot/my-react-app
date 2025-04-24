สวัสดีครับผม ชื่อ ณัฐวุฒิ สิริกัลยาณวัตร

ของอยู่ใน ====> TextInput.component.tsx

1. nvm install 16.20.0
2. npm install
3. yarn start

สำหรับ unit test 
ของอยู่ใน ====> TextInput.component.test.tsx

1. npx jest
    ผลที่เขียนไว้
        พิมพ์คำลงใน input ว่า apple,banana กด Enter 
        ตรวจสอบว่า apple และ banana ปรากฏ
        คลิก banana เพื่อแก้ไข
        แก้ banana => phone แล้วกดในที่ว่าง (onBlur)
        ตรวจสอบว่า phone ปรากฏ
        ลบ apple โดยคลิกปุ่ม ❌ ข้างๆ
        ตรวจสอบว่า phone จะเหลือแค่ 1 ตัว

lib ที่ใช้ unit test
@testing-library/react
@testing-library/jest-dom