import Link from "next/link";
import { useRouter } from "next/router";

function ActiveLink({ children, href, icon }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  const style = {
    backgroundColor: isActive ? "#146ebe" : "transparent",
    color: isActive ? "#fff" : "#d9d9d9",
    padding: "0 18px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 500,
    transition: "all 0.3s ease",
    textDecoration: "none",
  };

  return (
    <Link href={href} style={style}>
      {icon}
      <span>{children}</span>
    </Link>
  );
}

export default ActiveLink;
