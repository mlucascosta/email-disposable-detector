import axios from 'axios';

export interface SimplifiedRDAPInfo {
  domain: string;
  handle?: string;
  status?: string[];
  created_at?: string;
  expires_at?: string;
  last_changed?: string;
  nameservers?: string[];
  secure_dns?: boolean;
}

export async function getDomainRDAPInfo(domain: string): Promise<SimplifiedRDAPInfo | null> {
  try {
    const { data } = await axios.get(`https://rdap.org/domain/${domain}`);

    const created = data.events?.find((e: any) => e.eventAction === 'registration')?.eventDate;
    const expires = data.events?.find((e: any) => e.eventAction === 'expiration')?.eventDate;
    const lastChanged = data.events?.find((e: any) => e.eventAction === 'last changed')?.eventDate;

    const result: SimplifiedRDAPInfo = {
      domain: data.ldhName || domain,
      handle: data.handle,
      status: data.status,
      created_at: created,
      expires_at: expires,
      last_changed: lastChanged,
      nameservers: data.nameservers?.map((ns: any) => ns.ldhName),
      secure_dns: data.secureDNS?.delegationSigned ?? false,
    };

    return result;
  } catch (err: any) {
    console.error('[getDomainRDAPInfo] Erro ao consultar RDAP:', err.message || err);
    return null;
  }
}
