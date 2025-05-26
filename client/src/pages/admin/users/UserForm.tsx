import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

type RoleOption = {
  value: number
  label: string
}

export default function UserForm({
  gender,
  setGender,
  role,
  setRole,
  roleOptions,
}: {
  gender: string
  setGender: (value: string) => void
  role: number
  setRole: (value:  number) => void
  roleOptions: RoleOption[]
}) {
  return (
    <>
      <Input name="name" placeholder="Họ tên" required />
      <Input name="email" placeholder="Email" type="email" required />
      <Input name="phone" placeholder="Số điện thoại" />
      <Input name="dob" placeholder="Ngày sinh" type="date" />

      <Select value={gender} onValueChange={setGender}>
        <SelectTrigger>
          <SelectValue placeholder="Chọn giới tính" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Nam</SelectItem>
          <SelectItem value="female">Nữ</SelectItem>
        </SelectContent>
      </Select>

      <Input name="password" placeholder="Mật khẩu" type="password" required />

      <select
        name="role"
        value={role}
        onChange={(e) => setRole(Number(e.target.value))}
        required
        className="border rounded p-2"
      >
        <option value="" disabled>
          Chọn vai trò
        </option>
        {roleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
