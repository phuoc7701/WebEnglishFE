import { Input } from "@/components/ui/input"

type RoleOption = {
  value: string
  label: string
}

export default function UserForm({
  role,
  setRole,
  roleOptions,
}: {
  role: string
  setRole: (value: string) => void
  roleOptions: RoleOption[]
}) {
  return (
    <>
      <Input name="username" placeholder="Tên đăng nhập" required />
      <Input name="fullname" placeholder="Họ tên" required />
      <Input name="email" placeholder="Email" type="email" required />
      <Input name="dob" placeholder="Ngày sinh" type="date" required />
      <Input name="password" placeholder="Mật khẩu" type="password" required />
      <select
        name="role"
        value={role}
        onChange={e => setRole(e.target.value)}
        required
      >
        <option value="" disabled>Chọn vai trò</option>
        {roleOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </>
  )
}