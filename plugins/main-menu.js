import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'
const time = moment.tz('Asia/Kolkata').format('HH')
let wib = moment.tz('Asia/Kolkata').format('HH:mm:ss')
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command}) => {
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
let pp = './Guru.jpg'
let user = global.db.data.users[who]
let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = global.db.data.users[who]
let { min, xp, max } = xpRange(user.level, global.multiplier)
let username = conn.getName(who)
let math = max - xp
let prem = global.prems.includes(who.split`@`[0])
let sn = createHash('md5').update(who).digest('hex')
let totaluser = Object.values(global.db.data.users).length 
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length 
let more = String.fromCharCode(8206)
let readMore = more.repeat(850) 
let greeting = ucapan()
let quote = quotes[Math.floor(Math.random() * quotes.length)];

let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
let str = `
🚀 *_${name}'in kemerini bağla, ${greeting}! Bir maceraya çıkıyoruz_* 🚀

📜 *_Günün Sözü: ${quote}_* 📜

┏━💼 _Kullanıcı Bilgi:_ 💼━┓
┃ 👾  *Kullanıcı Tag:* ${taguser} 
┃ 🎩  *Nick:* ${name} 
┃ 🦸  *Yapımcı:* ${author} 
┃ 💎  *Elmaslar:* ${diamond} 
┃ 🏆  *Rank:* ${role}
┃ 🎮  *XP:* ${exp} 
┗━━━━━━━━━━━┛

┏━━🤖 _BOT DURUM:_🤖━━┓
┃ 🤡  *Bot İsim:* ${botname} 
┃ 💻  *Platform:* Linux 
┃ 📣  *Önek:* ${usedPrefix} 
┃ 🕓  *Çalışma Süresi:* ${uptime}
┃ 💌  *Veri Tabanı:* ${rtotalreg} of ${totaluser} 
┃ 📚  *Toplam Kullanıcı:* ${totaluser} 
┗━━━━━━━━━━━━━┛

💡 *_Şüpheye düştüğünüzde ${usedPrefix}list'i kullanmayı unutmayın. Sanki büyü kitabım gibi!_* 💡
`


    conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, null, rpyt)
    m.react(done)

}
handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu', 'help','h','command'] 

export default handler
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
    
    function ucapan() {
      const time = moment.tz('Asia/Kolkata').format('HH')
      let res = "günün erken saatlerinde mutlu☀️"
      if (time >= 4) {
        res = "Günaydın Gak Gali Sabah Oldu 🌄"
      }
      if (time >= 10) {
        res = "Good Afternoon ☀️"
      }
      if (time >= 15) {
        res = "Good Afternoon 🌇"
      }
      if (time >= 18) {
        res = "İyi Geceler Yat Zıba Gali Geç Oldu🌙"
      }
      return res
    }
    const quotes = [
      "Aşk, kalplerde yeşeren ve ruhlarda açan en güzel çiçektir.",
      "Bilgi güçtür, ama bu gücü etik ve yasal sınırlar içinde kullanmak insanın erdemini yükseltir.",
      "Sevda, suskunluğun en anlamlı hali ve sözlerin en derin anlamıdır.",
      "Teknolojiyle sınırlar zorlamak yerine, insanlığın ilerlemesi ve güvenliği için çalışmalıyız.",
      "Aşk, iki ruhun bir bedende yaşadığı büyülü bir deneyimdir.",
      "Hack etmek yerine, becerilerimizi olumlu yollarla kullanarak dünyayı daha iyi bir yer haline getirebiliriz.",
      "Sevgi, karşılık beklemeden verilen en değerli hediye ve hissettiren en güçlü dokunuştur.",
      "İnternetin özgürlüğünü korumak, aynı zamanda sorumluluklarımızı da artırır.",
      "Aşk, gözlerle görülmeyip kalple hissedilen en güzel manzaradır.",
      "Bir bilgisayar korsanının gücü, etik değerlerle sınırlanmadığında en büyük tehdit olabilir.",
      "Sevdaya düşmek, içinde kaybolmak değil, birlikte yükselmektir.",
      "Yasalar toplumu düzenlemenin temel taşıdır; dijital dünyada da bu ilkeyi gözetmek zorundayız.",
      "Aşk, her anı özel kılan sihirli bir zaman dilimidir.",
      "Bir bilgisayar korsanı değil, bir etik hacker olun; zayıf noktaları bulup güvenliği artırmak için çaba sarf edin.",
      "Sevgi, kelimelerle ifade edilemeyen ve yaşanarak anlaşılan bir sırdır.",
      "Bilişim dünyasında gerçek başarı, bilginin paylaşılması ve toplumun faydasına kullanılmasında gizlidir.",
      "Aşkın en güzel hali, sevilenin mutluluğunu kendi mutluluğundan üstün tutmaktır.",
      "Dijital dünyada etik ve yasallık, gerçek dünyada olduğu kadar önemlidir.",
      "Sevda, hayatın anlamını keşfetmek için atılan en cesur adımdır.",
      "Geleceği şekillendirenler, siber uzayı güvenli ve adil kılanlardır; unutmayın ki her eylemin bir sonucu vardır."
    ]
    
