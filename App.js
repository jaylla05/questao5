import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const num = (t) => (t.trim() === '' ? NaN : Number(t.replace(',', '.')));
const brl = (v) => 'R$ ' + v.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function App() {
  const [saldo, setSaldo] = useState(1000);
  const [valor, setValor] = useState('');
  const [msg, setMsg] = useState({ t: '', ok: true });

  const operar = (tipo) => {
    const v = num(valor);
    if (isNaN(v) || v <= 0) return setMsg({ t: 'Informe um valor positivo.', ok: false });
    if (tipo === 'saque' && v > saldo) return setMsg({ t: 'Saldo insuficiente para o saque.', ok: false });
    setSaldo(tipo === 'deposito' ? saldo + v : saldo - v);
    setMsg({ t: `${tipo === 'deposito' ? 'Depósito' : 'Saque'} de ${brl(v)} realizado.`, ok: true });
    setValor('');
  };

  return (
    <View style={s.c}>
      <Text style={s.t}>🏦 Simulador de conta</Text>
      <Text style={s.saldo}>Saldo: {brl(saldo)}</Text>
      <TextInput style={s.i} placeholder="Valor (R$)" keyboardType="numeric" value={valor} onChangeText={setValor} />
      <Pressable style={[s.b, { backgroundColor: '#1e8449' }]} onPress={() => operar('deposito')}><Text style={s.bt}>Depositar</Text></Pressable>
      <Pressable style={[s.b, { backgroundColor: '#c0392b' }]} onPress={() => operar('saque')}><Text style={s.bt}>Sacar</Text></Pressable>
      {msg.t !== '' && <Text style={{ color: msg.ok ? '#1e8449' : '#c0392b', marginTop: 8 }}>{msg.t}</Text>}
      <Text style={s.nota}>Simulação didática: nenhum dinheiro real é movimentado.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#f4f6fb' },
  t: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1f2a44' },
  saldo: { fontSize: 28, fontWeight: '800', color: '#1f2a44', marginVertical: 16 },
  i: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccd', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  b: { padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  bt: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  nota: { marginTop: 24, color: '#778', fontSize: 12 },
});