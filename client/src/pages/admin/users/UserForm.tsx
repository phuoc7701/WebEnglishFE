import { Input } from "@/components/ui/input"

type RoleOption = {
  value: string
  label: string
}

type UserFormProps = {
  role: string
  setRole: (value: string) => void
  roleOptions: RoleOption[]
  form: {
    username: string
    fullname: string
    email: string
    dob: string
    password: string
  }
  errors: { [key: string]: string }
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
  touched: { [key: string]: boolean }
  submitted: boolean
}

export default function UserForm({
  role,
  setRole,
  roleOptions,
  form,
  errors,
  onChange,
  onBlur,
  touched,
  submitted,
}: UserFormProps) {
  return (
    <>
      <Input name="username" placeholder="Tên đăng nhập" value={form.username} onChange={onChange} onBlur={onBlur}/>
      {errors.username && <div style={{ color: "red" }}>{errors.username}</div>}

      <Input name="fullname" placeholder="Họ tên" value={form.fullname} onChange={onChange} onBlur={onBlur}/>
      {errors.fullname && <div style={{ color: "red" }}>{errors.fullname}</div>}

      <Input name="email" placeholder="Email" type="email" value={form.email} onChange={onChange} onBlur={onBlur}/>
      {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}

      <Input name="dob" placeholder="Ngày sinh" type="date" value={form.dob} onChange={onChange} onBlur={onBlur}/>
      {errors.dob && <div style={{ color: "red" }}>{errors.dob}</div>}

      <Input name="password" placeholder="Mật khẩu" type="password" value={form.password} onChange={onChange} onBlur={onBlur}/>
      {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}

      <select name="role" value={role} onChange={onChange} onBlur={onBlur}>
        <option value="" disabled>Chọn vai trò</option>
        {roleOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {errors.role && <div style={{ color: "red" }}>{errors.role}</div>}
    </>
  )
}